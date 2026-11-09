import { useState } from "react";
import TaskSearch from "../components/TaskSearch";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasks";
import TaskList from "../components/TaskList";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../components/RequestStates";
export default function TasksPage() {
  const [search, setSearch] = useState("");
  const query = useQuery({ queryKey: ["todos"], queryFn: getTasks });
  const searchTerm = search.trim().toLowerCase();
  const filteredTasks = (query.data ?? []).filter((task) =>
    task.title.toLowerCase().includes(searchTerm),
  );
  return (
    <>
      <div className="mb-9">
        <p className="eyebrow">Your workspace, at a glance</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Every task. One place.
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-stone-500">
          Browse the list, check progress, and open a task for the details.
        </p>
      </div>
      {query.isPending ? (
        <LoadingState />
      ) : (
        <>
          {query.isError && (
            <ErrorState
              compact={!!query.data}
              isFetching={query.isFetching}
              onRetry={() => query.refetch()}
            />
          )}
          {query.data && (
            <>
              <TaskSearch value={search} onChange={setSearch} />
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="font-semibold">
                  {searchTerm ? "Matching tasks" : "All tasks"}{" "}
                  <span className="ml-2 rounded-md bg-purple-100 px-2 py-1 text-xs text-purple-900">
                    {filteredTasks.length}
                  </span>
                </h2>
                <span className="text-xs text-stone-500">
                  Read-only workspace
                </span>
              </div>
              {query.data.length ? (
                filteredTasks.length ? (
                  <TaskList tasks={filteredTasks} />
                ) : (
                  <section className="panel text-center" aria-live="polite">
                    <h2 className="text-xl font-semibold">
                      No tasks match your search
                    </h2>
                    <p className="mt-2 text-stone-600">
                      Try another title or clear your search to see all tasks.
                    </p>
                    <button
                      type="button"
                      className="button mt-5"
                      onClick={() => setSearch("")}
                    >
                      Clear search
                    </button>
                  </section>
                )
              ) : (
                <EmptyState />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
