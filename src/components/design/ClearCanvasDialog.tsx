import React from 'react';
import { useAppStore } from '../../store';

interface ClearCanvasDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ClearCanvasDialog: React.FC<ClearCanvasDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Clear Canvas
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove all components from the canvas? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md transition-colors"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Clear Canvas
          </button>
        </div>
      </div>
    </div>
  );
}; 