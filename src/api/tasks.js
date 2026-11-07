const BASE_URL = "https://jsonplaceholder.typicode.com";

async function request(path, signal) {
  const response = await fetch(`${BASE_URL}${path}`, { signal });
  if (response.status === 404) return null;
  if (!response.ok)
    throw new Error(`Request failed (${response.status}). Please try again.`);
  return response.json();
}

export async function getTasks({ signal }) {
  const tasks = await request("/todos", signal);
  if (!Array.isArray(tasks))
    throw new Error("The task list could not be read. Please try again.");
  return tasks;
}

export async function getTask(id, { signal }) {
  const task = await request(`/todos/${id}`, signal);
  if (!task || !task.id) return null;
  return task;
}
