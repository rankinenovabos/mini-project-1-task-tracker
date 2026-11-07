import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
export default function Layout() {
  const { pathname } = useLocation();
  const tasksActive = pathname === "/" || pathname.startsWith("/tasks/");
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="border-b border-purple-100 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 font-bold tracking-tight text-stone-900"
          >
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-xl bg-purple-900 text-lg text-white"
            >
              ✓
            </span>
            <span>Task Tracker</span>
          </Link>
          <nav aria-label="Main navigation" className="flex gap-2">
            <Link
              to="/"
              aria-current={tasksActive ? "page" : undefined}
              className={`nav-link ${tasksActive ? "nav-active" : ""}`}
            >
              Tasks
            </Link>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-active" : ""}`
              }
            >
              About
            </NavLink>
          </nav>
        </div>
      </header>
      <main
        id="main"
        tabIndex={-1}
        className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:px-8 sm:py-14"
      >
        <Outlet />
      </main>
      <footer className="border-t border-purple-100">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-2 px-5 py-6 text-xs text-stone-500 sm:px-8">
          <span>Mini Project 1 · React &amp; modern interfaces</span>
          <span>Sample data from JSONPlaceholder</span>
        </div>
      </footer>
    </div>
  );
}
