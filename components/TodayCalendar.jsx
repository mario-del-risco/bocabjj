"use client";
import React, { useState, useEffect } from "react";
import { getDatabase, ref, child, get } from "firebase/database";

const TodayCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Track current date
  const [currentData, setCurrentData] = useState(null); // Store today's data
  const [loading, setLoading] = useState(true);

  // Initialize Firebase Database
  const db = getDatabase();

  // Fetch data from Firebase Realtime Database
  const fetchCalendarData = async () => {
    const year = currentDate.getFullYear();
    const week = Math.ceil(
      (currentDate.getDate() +
        (currentDate.getDay() === 0 ? 7 : currentDate.getDay()) -
        1) /
        7
    );
    const day = currentDate.getDate();

    const dbRef = ref(db, `year/${week}/${day}`);
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available for this date.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  // Fetch data for the current date
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await fetchCalendarData();
        setCurrentData(data);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
        setCurrentData(null);
      }

      setLoading(false);
    };

    fetchData();
  }, [currentDate]);

  // Navigate to a new date (yesterday or tomorrow)
  const handleDateChange = (days) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!currentData) {
    return (
      <div className="p-4 bg-gray-100 border rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          No Data Available
        </h2>
        <p className="text-center text-gray-500">
          No class or schedule information available for this date.
        </p>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handleDateChange(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md mx-2"
          >
            Yesterday
          </button>
          <button
            onClick={() => handleDateChange(1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mx-2"
          >
            Tomorrow
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 border rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        Schedule for {currentData.day_index}
      </h2>
      <p className="text-center text-sm text-gray-600 mb-6">
        Date: {currentData.date.slice(0, 2)}/{currentData.date.slice(2, 4)}/
        {currentData.date.slice(4)}
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold text-center">Groups</h3>
          <div className="space-y-2 mt-2">
            {["Little Kids", "Middle Kids", "Big Kids", "Adults"].map(
              (group) => (
                <div
                  key={group}
                  className="flex flex-col items-center justify-between bg-blue-100 p-2 rounded-md shadow-sm"
                >
                  <div className="font-bold">{group}</div>
                  <div className="text-sm space-y-1">
                    <p>🌱 New: {currentData[group]?.New || "N/A"}</p>
                    <p>📖 Review: {currentData[group]?.Review || "N/A"}</p>
                    <p>🎮 Play: {currentData[group]?.Play || "N/A"}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {currentData.dailyLog && (
          <div className="bg-gray-200 p-4 rounded shadow-md">
            <h4 className="text-lg font-semibold mb-2">Daily Log</h4>
            <p className="text-gray-700">{currentData.dailyLog}</p>
          </div>
        )}

        {currentData.comments && (
          <div className="bg-yellow-100 p-4 rounded shadow-md">
            <h4 className="text-lg font-semibold mb-2">Comments</h4>
            <p className="text-gray-700">{currentData.comments}</p>
          </div>
        )}

        {currentData.training_elements && (
          <div className="bg-green-100 p-4 rounded shadow-md">
            <h4 className="text-lg font-semibold mb-2">Training Elements</h4>
            <p className="text-gray-700">
              Goal: {currentData.training_elements.goal}
            </p>
            <p className="text-gray-700">
              Overarching Principles:{" "}
              {currentData.training_elements.overarching_principles}
            </p>
            <p className="text-gray-700">
              Targeted Work: {currentData.training_elements.targeted_work}
            </p>
            <p className="text-gray-700">
              Exercises: {currentData.training_elements.exercises}
            </p>
          </div>
        )}

        <div className="bg-green-100 p-4 rounded shadow-md text-center">
          <p className="text-lg font-semibold">
            Next Belt Test: {currentData.days_until_test} days
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => handleDateChange(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md mx-2"
        >
          Yesterday
        </button>
        <button
          onClick={() => handleDateChange(1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mx-2"
        >
          Tomorrow
        </button>
      </div>
    </div>
  );
};

export default TodayCalendar;
