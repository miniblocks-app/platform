import { create } from 'zustand';
import { Project, Screen, ComponentData } from '../types';
import { persist } from 'zustand/middleware';

interface AppState {
  activeTab: 'DESIGN' | 'BLOCKS';
  currentProject: Project | null;
  selectedScreen: string | null;
  selectedComponent: string | null;
  showDeleteDialog: boolean;
  screenToDelete: string | null;
  history: {
    past: Project[];
    future: Project[];
  };
  setActiveTab: (tab: 'DESIGN' | 'BLOCKS') => void;
  setCurrentProject: (project: Project) => void;
  setSelectedScreen: (screenId: string | null) => void;
  setSelectedComponent: (componentId: string | null) => void;
  setShowDeleteDialog: (show: boolean) => void;
  setScreenToDelete: (screenId: string | null) => void;
  addScreen: (screen: Screen) => void;
  deleteScreen: (screenId: string) => void;
  updateScreen: (screenId: string, updates: Partial<Screen>) => void;
  addComponent: (screenId: string, component: ComponentData) => void;
  updateComponent: (screenId: string, componentId: string, updates: Partial<ComponentData>) => void;
  deleteComponent: (screenId: string, componentId: string) => void;
  undo: () => void;
  redo: () => void;
  renameProject: (name: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      activeTab: 'DESIGN',
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
      setCurrentProject: (project) => set((state) => ({
        currentProject: project,
        history: {
          past: [...state.history.past, state.currentProject],
          future: [],
        },
      })),
      
      setSelectedScreen: (screenId) => set({ selectedScreen: screenId }),
      setSelectedComponent: (componentId) => set({ selectedComponent: componentId }),
      setShowDeleteDialog: (show) => set({ showDeleteDialog: show }),
      setScreenToDelete: (screenId) => set({ screenToDelete: screenId }),
      
      addScreen: (screen) => set((state) => ({
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

      deleteScreen: (screenId) => set((state) => {
        if (!state.currentProject) return state;

        const newScreens = state.currentProject.screens.filter(s => s.id !== screenId);
        const newSelectedScreen = state.selectedScreen === screenId 
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
      
      updateScreen: (screenId, updates) => set((state) => ({
        currentProject: state.currentProject
          ? {
              ...state.currentProject,
              screens: state.currentProject.screens.map((screen) =>
                screen.id === screenId ? { ...screen, ...updates } : screen
              ),
            }
          : null,
        history: {
          past: [...state.history.past, state.currentProject],
          future: [],
        },
      })),
      
      addComponent: (screenId, component) => set((state) => ({
        currentProject: state.currentProject
          ? {
              ...state.currentProject,
              screens: state.currentProject.screens.map((screen) =>
                screen.id === screenId
                  ? { ...screen, components: [...screen.components, component] }
                  : screen
              ),
            }
          : null,
        history: {
          past: [...state.history.past, state.currentProject],
          future: [],
        },
      })),
      
      updateComponent: (screenId, componentId, updates) => set((state) => ({
        currentProject: state.currentProject
          ? {
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
            }
          : null,
        history: {
          past: [...state.history.past, state.currentProject],
          future: [],
        },
      })),

      deleteComponent: (screenId, componentId) => set((state) => ({
        currentProject: state.currentProject
          ? {
              ...state.currentProject,
              screens: state.currentProject.screens.map((screen) =>
                screen.id === screenId
                  ? {
                      ...screen,
                      components: screen.components.filter((component) => component.id !== componentId),
                    }
                  : screen
              ),
            }
          : null,
        selectedComponent: null,
        history: {
          past: [...state.history.past, state.currentProject],
          future: [],
        },
      })),

      undo: () => set((state) => {
        const previous = state.history.past[state.history.past.length - 1];
        if (!previous) return state;

        const newPast = state.history.past.slice(0, -1);
        return {
          currentProject: previous,
          history: {
            past: newPast,
            future: [state.currentProject, ...state.history.future],
          },
        };
      }),

      redo: () => set((state) => {
        const next = state.history.future[0];
        if (!next) return state;

        const newFuture = state.history.future.slice(1);
        return {
          currentProject: next,
          history: {
            past: [...state.history.past, state.currentProject],
            future: newFuture,
          },
        };
      }),

      renameProject: (name) => set((state) => ({
        currentProject: state.currentProject
          ? {
              ...state.currentProject,
              name: name.trim() || 'My First Project',
            }
          : null,
        history: {
          past: [...state.history.past, state.currentProject],
          future: [],
        },
      })),
    }),
    {
      name: 'miniblocks-storage',
    }
  )
);