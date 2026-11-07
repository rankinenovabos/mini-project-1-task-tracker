export default function AboutPage() {
  return (
    <>
      <p className="eyebrow">Small app. Practical foundations.</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">
        About this project
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-stone-500">
        A task browser built for Mini Project 1 in Full Stack Development with
        AI.
      </p>
      <section className="panel mt-9">
        <h2 className="text-xl font-semibold">
          Built to make the basics clear
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          Task Tracker brings a public task list into a simple, responsive
          interface. Open any task to see its details and completion status. The
          workspace is read-only: changes are not saved or sent to the API.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Under the hood</h2>
        <ul className="mt-4 space-y-3 text-stone-600">
          <li>
            <strong>React + Vite</strong> — reusable components and a fast
            development setup.
          </li>
          <li>
            <strong>React Router</strong> — task list, dynamic task details, and
            this page.
          </li>
          <li>
            <strong>TanStack Query</strong> — fetching, request states, and a
            one-minute freshness window.
          </li>
          <li>
            <strong>Tailwind CSS</strong> — responsive layouts and accessible
            visual styling.
          </li>
        </ul>
        <h2 className="mt-8 text-xl font-semibold">Sample data</h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          Tasks are supplied by{" "}
          <a
            className="font-medium text-purple-900 underline"
            href="https://jsonplaceholder.typicode.com/"
          >
            JSONPlaceholder
          </a>
          , a public API for learning and prototyping. User IDs are shown as
          provided by the API.
        </p>
      </section>
    </>
  );
}
