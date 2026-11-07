import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasks";
import TaskList from "../components/TaskList";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../components/RequestStates";
export default function TasksPage() {
  const query = useQuery({ queryKey: ["todos"], queryFn: getTasks });
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
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="font-semibold">
                  All tasks{" "}
                  <span className="ml-2 rounded-md bg-purple-100 px-2 py-1 text-xs text-purple-900">
                    {query.data.length}
                  </span>
                </h2>
                <span className="text-xs text-stone-500">
                  Read-only workspace
                </span>
              </div>
              {query.data.length ? (
                <TaskList tasks={query.data} />
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
