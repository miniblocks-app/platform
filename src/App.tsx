import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { useAppStore } from "./store";
import { DesignWindow } from "./components/design/DesignWindow";
import { BlocksWindow } from "./components/blocks/BlocksWindow";
import { DeleteScreenDialog } from "./components/design/DeleteScreenDialog";
import ProjectsDashboard from "./pages/ProjectsDashboard";
import DashboardLayout from "./components/layout/DashboardLayout";

function CanvasLayout() {
  const { activeTab } = useAppStore();

  // Initialize a default project if none exists
  React.useEffect(() => {
    const { currentProject, setCurrentProject } = useAppStore.getState();
    if (!currentProject) {
      setCurrentProject({
        id: crypto.randomUUID(),
        name: "My First Project",
        screens: [],
      });
    }
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex">
        {activeTab === "DESIGN" && <DesignWindow />}
        <div
          className={`flex-1 flex ${
            activeTab === "DESIGN" ? "hidden" : ""
          }`}
        >
          <BlocksWindow />
        </div>
      </main>
      <DeleteScreenDialog />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout>
            <ProjectsDashboard />
          </DashboardLayout>
        }
      />
      <Route path="/canvas" element={<CanvasLayout />} />
      <Route path="/canvas/:projectId" element={<CanvasLayout />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
