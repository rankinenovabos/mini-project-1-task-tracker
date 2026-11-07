export function LoadingState() {
  return (
    <div role="status" className="space-y-3">
      <p className="mb-5 text-sm text-stone-600">Loading tasks…</p>
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          aria-hidden="true"
          className="h-20 animate-pulse rounded-xl border border-purple-100 bg-purple-50 motion-reduce:animate-none"
        />
      ))}
    </div>
  );
}
export function ErrorState({ onRetry, isFetching, compact = false }) {
  return (
    <div
      role="alert"
      className={`rounded-xl border border-red-200 bg-red-50 p-5 ${compact ? "mb-5" : ""}`}
    >
      <h2 className="font-semibold text-red-900">
        {compact ? "Couldn’t refresh tasks" : "Couldn’t load tasks"}
      </h2>
      <p className="mt-1 text-sm text-red-800">
        Check your connection and try again.
        {compact ? " Your previously loaded data is still shown below." : ""}
      </p>
      <button
        type="button"
        className="button mt-4"
        disabled={isFetching}
        onClick={onRetry}
      >
        {isFetching ? "Trying again…" : "Try again"}
      </button>
    </div>
  );
}
export function EmptyState() {
  return (
    <section className="rounded-2xl border border-dashed border-purple-200 bg-white px-6 py-16 text-center">
      <span aria-hidden="true" className="text-3xl text-purple-400">
        ○
      </span>
      <h2 className="mt-4 text-xl font-semibold">No tasks yet</h2>
      <p className="mt-2 text-sm text-stone-500">
        There are no tasks available from the data source.
      </p>
    </section>
  );
}
