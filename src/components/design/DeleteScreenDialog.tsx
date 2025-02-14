import React from 'react';
import { useAppStore } from '../../store';

export const DeleteScreenDialog = () => {
  const { showDeleteDialog, screenToDelete, setShowDeleteDialog, deleteScreen, currentProject } = useAppStore();
  
  if (!showDeleteDialog || !screenToDelete || !currentProject) return null;
  
  const screen = currentProject.screens.find(s => s.id === screenToDelete);
  if (!screen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Delete Screen</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "{screen.name}"? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            onClick={() => setShowDeleteDialog(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={() => deleteScreen(screenToDelete)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};