// WeeklyCalendar.js
"use client";
import React, { useState, useEffect } from "react";
import { getCalendarData } from "./dataConnect"; // Import your Data Connect function

const WeeklyCalendar = () => {
  const [calendarData, setCalendarData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCalendarData();
      // Sort the data by week number
      const sortedData = Object.entries(data)
        .sort(([weekA], [weekB]) => parseInt(weekA) - parseInt(weekB))
        .reduce((acc, [week, days]) => ({ ...acc, [week]: days }), {});
      setCalendarData(sortedData);
    };

    fetchData();
  }, []);

  return (
    <div className="container p-10">
      {Object.entries(calendarData).map(([week, days]) => (
        <div key={week} className="week">
          <h2>Week {week}</h2>
          <div className="grid grid-cols-7 my-10">
            {Object.entries(days).map(([day, data]) => (
              <div key={day} className="day">
                <h3>{day}</h3>
                <p>Date: {data.date}</p>
                <p>Month: {data.month}</p>
                <p>
                  Class:{" "}
                  {data.do_we_have_class === "yes_class_today" ? "Yes" : "No"}
                </p>
                {/* Add more data fields as needed */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyCalendar;
