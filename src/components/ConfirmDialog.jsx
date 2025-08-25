import React from "react";

function ConfirmDialog({ message, onConfirm }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-72 text-center">
        <p className="mb-4 text-lg">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => onConfirm(true)}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => onConfirm(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;