import * as Blockly from "blockly/core";
import { BackendBlocksTheme } from "./BackendComponents";
import { GoogleBlockTheme } from "./GoogleBlockSyles";

export const LogicTheme = Blockly.Theme.defineTheme("myCustomTheme", {
  // Define the theme name
  name: "myCustomTheme",
  // Define block styles
  blockStyles: {
    ...BackendBlocksTheme,
    ...GoogleBlockTheme, 
  },

  // Define category styles
  categoryStyles: {
    search: {
      colour: "#4a148c",
    },
  },

  // Define component styles
  componentStyles: {
    workspaceBackgroundColour: "#daebfbab",
    //  'toolboxBackgroundColour': '#36454ff0',
    toolboxForegroundColour: "#e2e2e2",
    flyoutBackgroundColour: "#dcdcdce9",
    flyoutForegroundColour: "#fff",
    flyoutOpacity: 1,
    scrollbarColour: "#b0c8df",
    scrollbarOpacity: 0.7,
    insertionMarkerColour: "#fff",
    insertionMarkerOpacity: 0.3,
    markerColour: "#fff",
    cursorColour: "#fff",
  },
  // Define font styles
  fontStyle: {
    family: "Arial, sans-serif",
    weight: "normal",
    size: 14,
  },
  // Optionally, set start hats
  startHats: true,
});
