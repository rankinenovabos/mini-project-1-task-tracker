import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "../api/queryClient";
import App from "../App";
const tasks = [
  { id: 1, userId: 4, title: "Prepare project brief", completed: false },
  { id: 2, userId: 5, title: "Review requirements", completed: true },
];
const response = (data, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => data,
});
function mount(path = "/") {
  const client = createQueryClient();
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  );
  return client;
}
describe("Task Tracker", () => {
  it("renders live-shaped tasks and status labels", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(response(tasks));
    mount();
    expect(
      await screen.findByRole("link", { name: tasks[0].title }),
    ).toHaveAttribute("href", "/tasks/1");
    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });
  it("navigates between distinct details and reuses fresh list and detail caches", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockImplementation(async (url) =>
        response(
          url.endsWith("/todos")
            ? tasks
            : tasks[Number(url.split("/").pop()) - 1],
        ),
      );
    const user = userEvent.setup();
    mount();
    await user.click(await screen.findByRole("link", { name: tasks[0].title }));
    expect(
      await screen.findByRole("heading", { name: tasks[0].title }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: /Back to tasks/ }));
    await user.click(await screen.findByRole("link", { name: tasks[1].title }));
    expect(
      await screen.findByRole("heading", { name: tasks[1].title }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: /Back to tasks/ }));
    await user.click(await screen.findByRole("link", { name: tasks[0].title }));
    expect(
      await screen.findByRole("heading", { name: tasks[0].title }),
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
  it("shows loading until the request resolves", async () => {
    let finish;
    vi.spyOn(globalThis, "fetch").mockImplementation(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        }),
    );
    mount();
    expect(screen.getByRole("status")).toHaveTextContent("Loading tasks");
    finish(response(tasks));
    expect(
      await screen.findByRole("link", { name: tasks[0].title }),
    ).toBeInTheDocument();
  });
  it("shows an empty state", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(response([]));
    mount();
    expect(
      await screen.findByRole("heading", { name: "No tasks yet" }),
    ).toBeInTheDocument();
  });
  it("shows an error and recovers on manual retry", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(response({}, 500))
      .mockResolvedValue(response(tasks));
    mount();
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Couldn’t load tasks",
    );
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(
      await screen.findByRole("link", { name: tasks[0].title }),
    ).toBeInTheDocument();
  });
  it("keeps loaded tasks when a background refresh fails", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(response(tasks))
      .mockRejectedValue(new Error("network"));
    const client = mount();
    await screen.findByRole("link", { name: tasks[0].title });
    await client.refetchQueries({ queryKey: ["todos"] });
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Couldn’t refresh tasks",
    );
    expect(
      screen.getByRole("link", { name: tasks[0].title }),
    ).toBeInTheDocument();
  });
  it.each(["/tasks/nope", "/tasks/0", "/tasks/-1"])(
    "rejects invalid ID at %s without fetching",
    async (path) => {
      const fetchMock = vi.spyOn(globalThis, "fetch");
      mount(path);
      expect(
        screen.getByRole("heading", { name: "Task not found" }),
      ).toBeInTheDocument();
      expect(fetchMock).not.toHaveBeenCalled();
    },
  );
  it("handles a missing task", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(response({}, 404));
    mount("/tasks/9999");
    expect(
      await screen.findByRole("heading", { name: "Task not found" }),
    ).toBeInTheDocument();
  });
  it("handles unknown routes", () => {
    mount("/missing");
    expect(
      screen.getByRole("heading", { name: "Page not found" }),
    ).toBeInTheDocument();
  });
  it("loads task details directly", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(response(tasks[1]));
    mount("/tasks/2");
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: tasks[1].title }),
      ).toBeInTheDocument(),
    );
    expect(fetchMock).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos/2",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });
});
