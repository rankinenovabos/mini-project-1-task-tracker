export default function StatusBadge({ completed }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${completed ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${completed ? "bg-emerald-600" : "bg-amber-600"}`}
      />
      {completed ? "Done" : "Open"}
    </span>
  );
}
