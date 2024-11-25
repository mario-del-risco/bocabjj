"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import WeekInfo from "/components/WeekInfo";
import data from "/public/data.json";

const ClassSchedule = () => {
  const params = useParams();
  const className = params.className;
  const [scheduleData, setScheduleData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (className) {
      const classSchedules = data.classes[className];
      if (classSchedules) {
        // Render only the first (current) week
        setScheduleData(classSchedules.slice(0, 1));
      } else {
        setError("Class schedule not found.");
      }
    }
  }, [className]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        {className} Current Week Schedule
      </h1>

      {scheduleData ? (
        <div>
          {scheduleData.map((week, index) => (
            <div key={index} className="space-y-6">
              <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                Week: {week.startDate} - {week.endDate}
              </h2>
              {Object.entries(week.dailySchedule).map(([day, details]) => (
                <div
                  key={day}
                  className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {day}
                  </h3>
                  <h4 className="text-blue-600 font-medium">{details.title}</h4>
                  <p className="text-gray-500">{details.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="text-center text-gray-500">Loading schedule...</p>
          <WeekInfo />
        </>
      )}
    </div>
  );
};

export default ClassSchedule;
