"use client";
import { useState, useEffect } from "react";

export default function BeltInfo() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBelt, setSelectedBelt] = useState("All");

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setFilteredData(jsonData); // Initially display all students
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  useEffect(() => {
    // Filter data based on the selected belt
    if (selectedBelt === "All") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((student) => student.belt === selectedBelt));
    }
    setCurrentIndex(0); // Reset to first student in the filtered list
  }, [selectedBelt, data]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + filteredData.length) % filteredData.length
    );
  };

  if (!data.length) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (!filteredData.length) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Boca BJJ Members</h2>
        <select
          value={selectedBelt}
          onChange={(e) => setSelectedBelt(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="All">All</option>
          <option value="Black">Black</option>
          <option value="Purple">Purple</option>
          <option value="Blue">Blue</option>
        </select>
        <div className="text-center text-gray-500">
          No students in this category.
        </div>
      </div>
    );
  }

  const currentStudent = filteredData[currentIndex];

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Boca BJJ Members</h2>
      <select
        value={selectedBelt}
        onChange={(e) => setSelectedBelt(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        <option value="All">All</option>
        <option value="Black">Black</option>
        <option value="Purple">Purple</option>
        <option value="Blue">Blue</option>
      </select>
      <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white text-center">
        <p className="text-lg font-semibold">{currentStudent.name}</p>
        <p className="text-gray-600">Age: {currentStudent.age}</p>
        <p className="text-gray-600">Belt: {currentStudent.belt}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
