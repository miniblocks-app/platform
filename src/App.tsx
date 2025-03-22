import React from "react";
import { Header } from "./components/Header";
import { useAppStore } from "./store";
import { DesignWindow } from "./components/design/DesignWindow";
import { BlocksWindow } from "./components/blocks/BlocksWindow";
import { DeleteScreenDialog } from "./components/design/DeleteScreenDialog";

function App() {
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

export default App;
