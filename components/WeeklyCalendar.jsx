"use client";
import React, { useState, useEffect } from "react";
import { getCalendarData, updateCalendarData } from "./dataConnect";
import InlineEditModal from "./InlineEditModal";
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const WeeklyCalendar = () => {
  const [calendarData, setCalendarData] = useState({});
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEditData, setCurrentEditData] = useState(null);
  const [user, setUser] = useState(null); // Add user state
  const [authorizedUsers, setAuthorizedUsers] = useState([]); // Add authorized users state

  useEffect(() => {
    // Fetch calendar data regardless of sign-in status
    const fetchData = async () => {
      const data = await getCalendarData();
      const sortedData = Object.entries(data)
        .sort(([weekA], [weekB]) => parseInt(weekA) - parseInt(weekB))
        .reduce((acc, [week, days]) => ({ ...acc, [week]: days }), {});
      setCalendarData(sortedData);

      if (Object.keys(sortedData).length > 0) {
        setSelectedWeek(Object.keys(sortedData)[0]);
      }
    };

    fetchData();

    // Set up authentication state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update user state
      if (user) {
        // User is signed in
        console.log("User is signed in:", user);

        // Fetch authorized users (replace with your actual logic)
        const fetchAuthorizedUsers = async () => {
          // Example: Fetch authorized users from Firebase database
          // ...
          setAuthorizedUsers([
            "mariocesardelrisco@gmail.com",
            "bocabjj@gmail.com",
          ]); // Replace with your actual authorized users
        };

        fetchAuthorizedUsers();
      } else {
        // User is signed out
        console.log("User is signed out");
        // No need to clear calendar data or selected week
      }
    });

    // Cleanup function to remove the listener
    return () => unsubscribe();
  }, []);

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  const openInlineEditModal = (group, day, data) => {
    setCurrentEditData({ group, day, data });
    setEditModalOpen(true);
  };

  const renderDayCard = (day, data) => {
    const isClassDay = ["Monday", "Wednesday", "Friday", "Saturday"].includes(
      data.day_index
    );

    return (
      <div key={day} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
        <div
          className={`
          border rounded-lg p-3 h-full 
          ${isClassDay ? "bg-gray-50" : "bg-gray-200"}
        `}
        >
          <div className="text-center mb-2">
            <h3 className="font-bold text-lg">{data.day_index}</h3>
            <p className="text-sm text-gray-600">
              {data.month} {data.date.slice(2, 4)}
            </p>
            {data.do_we_have_class !== "yes_class_today" && (
              <p className="text-red-500 font-semibold">No Class</p>
            )}
          </div>

          {isClassDay && (
            <div className="space-y-2">
              {["Little Kids", "Middle Kids", "Big Kids", "Adults"].map(
                (group) => (
                  <div
                    key={group}
                    className="bg-white p-2 rounded-md shadow-sm relative"
                  >
                    {/* Show Edit button only if user is authorized */}
                    {user && authorizedUsers.includes(user.email) && (
                      <button
                        onClick={() => openInlineEditModal(group, day, data)}
                        className="absolute top-1 right-1 bg-blue-500 text-white p-1 rounded text-xs"
                      >
                        Edit
                      </button>
                    )}
                    <h4 className="font-semibold">{group}</h4>
                    <p className="text-sm flex items-center border-2  border-emerald-100 bg-emerald-100">
                      <span className="text-xl mr-1">🌱</span> {data[group].New}
                    </p>
                    <p className="text-sm flex items-center  border-blue-100 bg-blue-200">
                      <span className="text-xl mr-1">📖</span>{" "}
                      {data[group].Review}
                    </p>
                    <p className="text-sm flex items-center bg-violet-200">
                      <span className="text-xl mr-1 ">🎮</span>{" "}
                      {data[group].Play}
                    </p>
                  </div>
                )
              )}
              <div className="bg-blue-100 p-2 rounded-md text-center mt-2">
                <p className="text-sm font-medium">
                  Next Belt test in: {data.days_until_test} days
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4">
      {user ? (
        <>
          <div className="sticky top-0 bg-white z-10 mb-4 shadow-sm py-2">
            <select
              className="w-full max-w-xs mx-auto block p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedWeek || ""}
              onChange={handleWeekChange}
            >
              <option value="" disabled>
                Select a Week
              </option>
              {Object.keys(calendarData).map((week) => (
                <option key={week} value={week}>
                  Week {week}
                </option>
              ))}
            </select>
          </div>

          {selectedWeek && calendarData[selectedWeek] && (
            <div className="container mx-auto">
              <h2 className="text-2xl font-bold text-center mb-6">
                Week {selectedWeek}
              </h2>

              <div className="flex flex-wrap -mx-2 justify-center">
                {Object.entries(calendarData[selectedWeek])
                  .filter(([key]) =>
                    ["1", "2", "3", "4", "5", "6", "7"].includes(key)
                  )
                  .map(([day, data]) => renderDayCard(day, data))}
              </div>

              {calendarData[selectedWeek].bbe && (
                <div className="bg-black text-white p-4 mt-6 rounded-lg text-center">
                  <p className="text-xl font-extrabold">
                    {calendarData[selectedWeek].bbe}
                  </p>
                  <p className="text-gray-400 text-sm">Black Belt Excellence</p>
                </div>
              )}
            </div>
          )}

          {currentEditData && (
            <InlineEditModal
              isOpen={editModalOpen}
              onClose={() => setEditModalOpen(false)}
              initialData={currentEditData.data}
              weekNumber={selectedWeek}
              dayIndex={parseInt(currentEditData.day)}
              group={currentEditData.group}
            />
          )}
        </>
      ) : (
        <div className="container mx-auto text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">
            Please sign in to view the calendar
          </h2>
          <p className="text-gray-600">
            You need to be signed in to access the calendar and its editing
            features.
          </p>
        </div>
      )}
    </div>
  );
};

export default WeeklyCalendar;
