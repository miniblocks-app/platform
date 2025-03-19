import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

/** Example domain types */
interface Project {
  id: string;
  name: string;
  screens: Screen[];
}
interface Screen {
  id: string;
  components: ComponentData[];
}
interface ComponentData {
  id: string;
}

/** The shape of the store's state */
interface AppState {
  activeTab: 'DESIGN' | 'BLOCKS';
  debugMode: boolean;
  advanceMode: boolean;
  currentProject: Project | null;
  selectedScreen: string | null;
  selectedComponent: string | null;
  showDeleteDialog: boolean;
  screenToDelete: string | null;

  // Allow null here because you push state.currentProject (which can be null)
  history: {
    past: (Project | null)[];
    future: (Project | null)[];
  };

  setActiveTab: (tab: 'DESIGN' | 'BLOCKS') => void;
  setDebugMode: (mode: (debugMode: boolean) => boolean) => void;
  setAdvanceMode: (mode: (advanceMode: boolean) => boolean) => void;
  setCurrentProject: (project: Project) => void;
  setSelectedScreen: (screenId: string | null) => void;
  setSelectedComponent: (componentId: string | null) => void;
  setShowDeleteDialog: (show: boolean) => void;
  setScreenToDelete: (screenId: string | null) => void;

  addScreen: (screen: Screen) => void;
  deleteScreen: (screenId: string) => void;
  updateScreen: (screenId: string, updates: Partial<Screen>) => void;

  addComponent: (screenId: string, component: ComponentData) => void;
  updateComponent: (
    screenId: string,
    componentId: string,
    updates: Partial<ComponentData>
  ) => void;
  deleteComponent: (screenId: string, componentId: string) => void;

  undo: () => void;
  redo: () => void;
  renameProject: (name: string) => void;
}

/**
 * (1) Define the base store logic (without 'persist').
 */
const baseStore: StateCreator<AppState> = (set, get) => ({
  activeTab: 'DESIGN',
  debugMode: false,
  advanceMode: false,
  currentProject: null,
  selectedScreen: null,
  selectedComponent: null,
  showDeleteDialog: false,
  screenToDelete: null,
  history: {
    past: [],
    future: [],
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setDebugMode: (mode) => set((state) => ({ debugMode: mode(state.debugMode) })),
  setAdvanceMode: (mode) => set((state) => ({ advanceMode: mode(state.advanceMode) })),
  setCurrentProject: (project) => set((state) => ({
    currentProject: project,
    history: {
      past: state.currentProject ? [...state.history.past, state.currentProject] : [...state.history.past],
      future: [],
    },
  })),
  
  setSelectedScreen: (screenId) => set({ selectedScreen: screenId }),
  setSelectedComponent: (componentId) => set({ selectedComponent: componentId }),
  setShowDeleteDialog: (show) => set({ showDeleteDialog: show }),
  setScreenToDelete: (screenId) => set({ screenToDelete: screenId }),

  addScreen: (screen) =>
    set((state) => ({
      currentProject: state.currentProject
        ? {
            ...state.currentProject,
            screens: [...state.currentProject.screens, screen],
          }
        : null,
      history: {
        past: [...state.history.past, state.currentProject],
        future: [],
      },
    })),

  deleteScreen: (screenId) =>
    set((state) => {
      if (!state.currentProject) return state;

      const newScreens = state.currentProject.screens.filter(
        (s) => s.id !== screenId
      );
      const newSelectedScreen =
        state.selectedScreen === screenId
          ? newScreens[0]?.id || null
          : state.selectedScreen;

      return {
        currentProject: {
          ...state.currentProject,
          screens: newScreens,
        },
        selectedScreen: newSelectedScreen,
        showDeleteDialog: false,
        screenToDelete: null,
        history: {
          past: [...state.history.past, state.currentProject],
          future: [],
        },
      };
    }),

  updateScreen: (screenId, updates) =>
    set((state) => {
      if (!state.currentProject) return state;

      const updatedProject = {
        ...state.currentProject,
        screens: state.currentProject.screens.map((screen) =>
          screen.id === screenId ? { ...screen, ...updates } : screen
        ),
      };

      return {
        currentProject: updatedProject,
        history: {
          past: [...state.history.past, state.currentProject],
          future: [],
        },
      };
    }),

  addComponent: (screenId, component) =>
    set((state) => {
      if (!state.currentProject) return state;

      const updatedProject = {
        ...state.currentProject,
        screens: state.currentProject.screens.map((screen) =>
          screen.id === screenId
            ? {
                ...screen,
                components: [...screen.components, component],
              }
            : screen
        ),
      };

      return {
        currentProject: updatedProject,
        history: {
          past: [...state.history.past, state.currentProject],
          future: [],
        },
      };
    }),

  updateComponent: (screenId, componentId, updates) =>
    set((state) => {
      if (!state.currentProject) return state;

      const updatedProject = {
        ...state.currentProject,
        screens: state.currentProject.screens.map((screen) =>
          screen.id === screenId
            ? {
                ...screen,
                components: screen.components.map((component) =>
                  component.id === componentId
                    ? { ...component, ...updates }
                    : component
                ),
              }
            : screen
        ),
      };

      return {
        currentProject: updatedProject,
        history: {
          past: [...state.history.past, state.currentProject],
          future: [],
        },
      };
    }),

  deleteComponent: (screenId, componentId) =>
    set((state) => {
      if (!state.currentProject) return state;

      const updatedProject = {
        ...state.currentProject,
        screens: state.currentProject.screens.map((screen) =>
          screen.id === screenId
            ? {
                ...screen,
                components: screen.components.filter(
                  (c) => c.id !== componentId
                ),
              }
            : screen
        ),
      };

      return {
        currentProject: updatedProject,
        selectedComponent: null,
        history: {
          past: [...state.history.past, state.currentProject],
          future: [],
        },
      };
    }),

  undo: () =>
    set((state) => {
      const previous = state.history.past[state.history.past.length - 1];
      if (!previous) return state;

      const newPast = state.history.past.slice(0, -1);
      return {
        currentProject: previous,
        history: {
          past: newPast,
          future: state.currentProject
            ? [state.currentProject, ...state.history.future]
            : [...state.history.future],
        },
      };
    }),

  redo: () =>
    set((state) => {
      const next = state.history.future[0];
      if (!next) return state;

      const newFuture = state.history.future.slice(1);
      return {
        currentProject: next,
        history: {
          past: state.currentProject
            ? [...state.history.past, state.currentProject]
            : [...state.history.past],
          future: newFuture,
        },
      };
    }),

  renameProject: (name) =>
    set((state) => {
      if (!state.currentProject) return state;

      const updatedProject = {
        ...state.currentProject,
        name: name.trim() || 'My First Project',
      };

      return {
        currentProject: updatedProject,
        history: {
          past: [...state.history.past, state.currentProject],
          future: [],
        },
      };
    }),
});

/**
 * (2) Wrap the base store with 'persist'.
 *     Then cast to 'unknown' and back to 'StateCreator<AppState>' to fix the TS error about 'destroy'.
 */
const persistedStore = persist(baseStore, { name: 'app-store' }) as unknown as StateCreator<AppState>;

/**
 * (3) Pass the persisted store to 'create'.
 *     This final export is your typed, persisted Zustand store.
 */
export const useAppStore = create<AppState>(persistedStore);