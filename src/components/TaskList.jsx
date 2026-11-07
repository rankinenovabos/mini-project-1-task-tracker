import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
function TaskRow({ task }) {
  return (
    <li className="flex items-start gap-3 px-5 py-5 sm:items-center sm:gap-5">
      <span className="mt-1 w-9 shrink-0 font-mono text-xs text-stone-400">
        {String(task.id).padStart(3, "0")}
      </span>
      <div className="flex min-w-0 flex-1 flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <Link
          className="task-title min-w-0 break-words font-medium leading-relaxed text-stone-800 hover:text-purple-800 hover:underline"
          to={`/tasks/${task.id}`}
        >
          {task.title}
        </Link>
        <StatusBadge completed={task.completed} />
      </div>
      <span aria-hidden="true" className="mt-0.5 text-stone-400">
        ↗
      </span>
    </li>
  );
}
export default function TaskList({ tasks }) {
  return (
    <ul
      aria-label="Tasks"
      className="divide-y divide-stone-100 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
    >
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </ul>
  );
}
