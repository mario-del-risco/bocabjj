"use client";
import React, { useState, useEffect } from "react";
import { getCalendarData } from "./dataConnect";

const WeeklyCalendar = () => {
  const [calendarData, setCalendarData] = useState({});
  const [selectedWeek, setSelectedWeek] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCalendarData();
      const sortedData = Object.entries(data)
        .sort(([weekA], [weekB]) => parseInt(weekA) - parseInt(weekB))
        .reduce((acc, [week, days]) => ({ ...acc, [week]: days }), {});
      setCalendarData(sortedData);

      // Automatically select the first week if available
      if (Object.keys(sortedData).length > 0) {
        setSelectedWeek(Object.keys(sortedData)[0]);
      }
    };

    fetchData();
  }, []);

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
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
          ${isClassDay ? "bg-red-50" : "bg-gray-50"}
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
                    className="bg-white p-2 rounded-md shadow-sm"
                  >
                    <h4 className="font-semibold text-sm">{group}</h4>
                    <p className="text-xs">Age Range: {data[group].New}</p>
                    <p className="text-xs">Activity: {data[group].Review}</p>
                    <p className="text-xs">Pay: {data[group].Play}</p>
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
      {/* Week Selection Dropdown - Fixed at Top */}
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

      {/* Selected Week Details */}
      {selectedWeek && calendarData[selectedWeek] && (
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">
            Week {selectedWeek}
          </h2>

          {/* Days Grid */}
          <div className="flex flex-wrap -mx-2 justify-center">
            {Object.entries(calendarData[selectedWeek])
              .filter(([key]) =>
                ["1", "2", "3", "4", "5", "6", "7"].includes(key)
              )
              .map(([day, data]) => renderDayCard(day, data))}
          </div>

          {/* Black Belt Excellence */}
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
    </div>
  );
};

export default WeeklyCalendar;
