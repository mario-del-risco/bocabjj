"use client";
import React, { useState } from "react";
import { updateCalendarData } from "./dataConnect";

const InlineEditModal = ({
  isOpen,
  onClose,
  initialData,
  weekNumber,
  dayIndex,
  group,
}) => {
  const [formData, setFormData] = useState(initialData[group]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...initialData,
        [group]: formData,
      };

      console.log("Updating data:", updatedData); // Add logging

      // Update the data in Firebase (no password check)
      await updateCalendarData(weekNumber, dayIndex, updatedData);
      onClose();
    } catch (error) {
      console.error("Detailed update error:", error);
      alert(`Update failed: ${error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          Edit {group} Details - {dayIndex}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block mb-2">New (🌱)</label>
              <input
                value={formData.New}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, New: e.target.value }))
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Review (📖)</label>
              <input
                value={formData.Review}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, Review: e.target.value }))
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Play (🎮)</label>
              <input
                value={formData.Play}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, Play: e.target.value }))
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InlineEditModal;
