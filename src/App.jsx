import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import TasksPage from "./pages/TasksPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./components/NotFound";
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<TasksPage />} />
        <Route path="tasks/:id" element={<TaskDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
