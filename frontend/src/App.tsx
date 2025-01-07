import { Routes, Route } from "react-router-dom";
import { FullLayout } from "./components/Layouts/fullLayout";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import { Home } from "./pages/Home";
import { DynamicPage } from "./pages/DynamicPage";

export function App() {
  return (
    <FullLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<DynamicPage />} />
      </Routes>
    </FullLayout>
  );
}
