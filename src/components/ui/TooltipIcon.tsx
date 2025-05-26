import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { ComponentType } from '../../types';

export const TOOLTIP_DESCRIPTIONS: Record<ComponentType | string, string> = {
  button: 'A clickable button to perform actions.',
  text: 'Displays static or dynamic text.',
  image: 'Shows an image or icon.',
  spacer: 'Adds empty space between components.',
  input: 'A field for user text input.',
  counter: 'A numeric input with increment/decrement.',
  dropdown: 'A menu to select one option from a list.',
  radio: 'A single selectable option in a group.',
  checkbox: 'A box that can be checked or unchecked.',
  slider: 'A draggable bar for selecting a value.',
  circle: 'A circular shape.',
  line: 'A straight line shape.',
  rectangle: 'A rectangular shape.',
  square: 'A square shape.',
  star: 'A star shape.',
  Text: 'The text content of the component.',
  Color: 'The main color of the component.',
  "Background Color": 'The background color of the component.',
  Opacity: 'The transparency level of the component.',
  Padding: 'The internal spacing of the component.',
  "Font Size": 'The size of the text font.',
  "Button Style": 'The visual style of the button.',
  Placeholder: 'The hint text shown in an input field.',
  "Options (one per line)": 'The available options for a dropdown.',
  "Upload Image": 'Upload an image for the image component.',
  "Min Value": 'The minimum value for the slider.',
  "Max Value": 'The maximum value for the slider.',
};

export function TooltipIcon({ description }: { description: string }) {
  const [show, setShow] = useState(false);
  return (
    <span
      style={{ position: 'relative', display: 'inline-block', marginLeft: 4, cursor: 'pointer' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      tabIndex={0}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      <Info size={16} style={{ color: '#2563eb', verticalAlign: 'middle' }} />
      {show && (
        <span
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '100%',
            transform: 'translateX(-50%) translateY(-8px)',
            background: '#333',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: 4,
            fontSize: 13,
            whiteSpace: 'nowrap',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          {description}
        </span>
      )}
    </span>
  );
} 