export type ComponentType = 'button' | 'label' | 'text' | 'image' | 'icon';

export interface ComponentData {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  children?: ComponentData[];
}

export interface Screen {
  id: string;
  name: string;
  components: ComponentData[];
  settings: {
    scrollable: boolean;
    backgroundColor: string;
    orientation: 'portrait' | 'landscape';
    statusBar: {
      visible: boolean;
      style: 'default' | 'light' | 'dark';
      color: string;
    };
  };
}

export interface Project {
  id: string;
  name: string;
  screens: Screen[];
}