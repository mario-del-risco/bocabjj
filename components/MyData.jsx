"use client";
import React, { useState, useEffect } from "react";
import { db } from "../firebase.config"; // Import your Firebase config
import { ref, onValue } from "firebase/database";

const BJJClasses = () => {
  const [classes, setClasses] = useState({});

  useEffect(() => {
    const dbRef = ref(db, "classes"); // Reference to your 'classes' data

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setClasses(data);
    });

    // Cleanup listener when component unmounts
    return () => {
      // You can add a cleanup function here if needed
    };
  }, []);

  return (
    <div>
      <h2>BJJ Classes</h2>
      {Object.entries(classes).map(([ageGroup, classSchedules]) => (
        <div key={ageGroup}>
          <h3>{ageGroup}</h3>
          <ul>
            {classSchedules.map((classSchedule, index) => (
              <li key={index}>
                <h4>Class {index + 1}</h4>
                <p>Start Date: {classSchedule.startDate}</p>
                <p>End Date: {classSchedule.endDate}</p>
                <ul>
                  {Object.entries(classSchedule.dailySchedule).map(
                    ([day, schedule]) => (
                      <li key={day}>
                        <strong>{day}:</strong> {schedule.title} -{" "}
                        {schedule.description}
                      </li>
                    )
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BJJClasses;
