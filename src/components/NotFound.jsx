import { Link } from "react-router-dom";
export default function NotFound({ task = false }) {
  return (
    <section className="panel py-14 text-center">
      <p className="eyebrow">Nothing here</p>
      <h1 className="mt-3 text-3xl font-bold">
        {task ? "Task not found" : "Page not found"}
      </h1>
      <p className="mt-3 text-stone-600">
        {task
          ? "This task does not exist. Choose a task from the list."
          : "The address may be incorrect. Head back to your task list."}
      </p>
      <Link className="button mt-6 inline-block" to="/">
        Back to tasks
      </Link>
    </section>
  );
}
