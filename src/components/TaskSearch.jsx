export default function TaskSearch({ value, onChange }) {
  return (
    <div className="mb-6">
      <label htmlFor="task-search" className="mb-2 block text-sm font-semibold">
        Search task titles
      </label>
      <input
        id="task-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tasks…"
        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-800 placeholder:text-stone-400"
      />
    </div>
  );
}
