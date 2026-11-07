import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTask } from "../api/tasks";
import StatusBadge from "../components/StatusBadge";
import NotFound from "../components/NotFound";
import { LoadingState, ErrorState } from "../components/RequestStates";
export default function TaskDetailPage() {
  const { id } = useParams();
  const numericId = Number(id);
  const valid =
    /^\d+$/.test(id) && Number.isSafeInteger(numericId) && numericId > 0;
  const query = useQuery({
    queryKey: ["todo", numericId],
    queryFn: ({ signal }) => getTask(numericId, { signal }),
    enabled: valid,
  });
  if (!valid) return <NotFound task />;
  if (query.isPending) return <LoadingState />;
  if (query.data === null) return <NotFound task />;
  return (
    <>
      <Link
        to="/"
        className="mb-7 inline-block text-sm font-semibold text-purple-900 hover:underline"
      >
        ← Back to tasks
      </Link>
      {query.isError && (
        <ErrorState
          compact={!!query.data}
          isFetching={query.isFetching}
          onRetry={() => query.refetch()}
        />
      )}
      {query.data && (
        <article className="panel">
          <p className="eyebrow">Task details</p>
          <h1 className="mt-4 max-w-2xl break-words text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {query.data.title}
          </h1>
          <div className="mt-6">
            <StatusBadge completed={query.data.completed} />
          </div>
          <dl className="mt-9 grid gap-6 border-t border-stone-100 pt-7 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-stone-500">Task number</dt>
              <dd className="mt-2 text-lg font-semibold">{query.data.id}</dd>
            </div>
            <div>
              <dt className="text-sm text-stone-500">Assigned user ID</dt>
              <dd className="mt-2 text-lg font-semibold">
                {query.data.userId}
              </dd>
            </div>
          </dl>
          <p className="mt-9 rounded-lg bg-purple-50 px-4 py-3 text-sm text-purple-900">
            This is a read-only task from JSONPlaceholder.
          </p>
        </article>
      )}
    </>
  );
}
