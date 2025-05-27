export type ComponentType = 
  // General components
  | 'button' 
  | 'text' 
  | 'image' 
  | 'spacer'
  // Form components
  | 'input'
  | 'counter'
  | 'dropdown'
  | 'radio'
  | 'checkbox'
  | 'slider'
  // Shape components
  | 'circle'
  | 'line'
  | 'rectangle'
  | 'square'
  | 'star'
  //Gaming components
  | 'scoreboard'
  | 'healthbar'
  | 'timer'
  | 'minimap'
  | 'pausemenu'
  | 'levelindicator';

export interface ComponentData {
  id: string;
  type: ComponentType;
  props: {
    style: {
      position?: string;
      left?: string;
      top?: string;
      color?: string;
      backgroundColor?: string;
      opacity?: number;
      padding?: string;
      fontSize?: string;
      width?: string;
      height?: string;
    };
    text?: string;
    value?: string | number;
    options?: string[];
    checked?: boolean;
  };
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

export interface ComponentSection {
  title: string;
  components: {
    type: ComponentType;
    label: string;
    icon: React.ReactNode;
  }[];
}