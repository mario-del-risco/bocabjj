"use client";
import React, { useState, useEffect } from "react";
import { db } from "../firebase.config";
import { ref, onValue, update } from "firebase/database";

const ExerciseAssessment = ({ studentId, exercise }) => {
  const [assessments, setAssessments] = useState({});

  useEffect(() => {
    const assessmentsRef = ref(
      db,
      `students/${studentId}/exercises/${exercise.exerciseName}`
    );

    onValue(assessmentsRef, (snapshot) => {
      const data = snapshot.val();
      setAssessments(data || {}); // Handle case where no assessments exist yet
    });
  }, [studentId, exercise.exerciseName]);

  const handleAssessmentChange = (assessment) => {
    const today = new Date()
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "")
      .replace(/ /g, "");

    setAssessments({
      ...assessments,
      [today]: assessment,
    });
  };

  const handleSubmitAssessment = async () => {
    try {
      await update(
        ref(db, `students/${studentId}/exercises/${exercise.exerciseName}`),
        assessments
      );
      console.log("Assessment submitted successfully!");
      setAssessments({}); // Clear assessments after submission
    } catch (error) {
      console.error("Error submitting assessments:", error);
    }
  };

  return (
    <div className="mb-2 flex items-center gap-2 justify-center">
      <div className="flex-1">{exercise.exerciseName}</div>
      <div className="flex space-x-2">
        <input
          type="radio"
          id={`assessment-good-${exercise.exerciseName}`}
          name={`assessment-${exercise.exerciseName}`}
          value="Good"
          checked={
            assessments[
              new Date()
                .toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\//g, "")
                .replace(/ /g, "")
            ] === "Good"
          }
          onChange={() => handleAssessmentChange("Good")}
        />
        <label htmlFor={`assessment-good-${exercise.exerciseName}`}>Good</label>
        <input
          type="radio"
          id={`assessment-bad-${exercise.exerciseName}`}
          name={`assessment-${exercise.exerciseName}`}
          value="Bad"
          checked={
            assessments[
              new Date()
                .toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\//g, "")
                .replace(/ /g, "")
            ] === "Bad"
          }
          onChange={() => handleAssessmentChange("Bad")}
        />
        <label htmlFor={`assessment-bad-${exercise.exerciseName}`}>Bad</label>
        <input
          type="radio"
          id={`assessment-very-bad-${exercise.exerciseName}`}
          name={`assessment-${exercise.exerciseName}`}
          value="Very Bad"
          checked={
            assessments[
              new Date()
                .toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\//g, "")
                .replace(/ /g, "")
            ] === "Very Bad"
          }
          onChange={() => handleAssessmentChange("Very Bad")}
        />
        <label htmlFor={`assessment-very-bad-${exercise.exerciseName}`}>
          Very Bad
        </label>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handleSubmitAssessment}
      >
        Submit Assessment
      </button>
      <div className="mt-2 ml-3">
        <select className="w-full px-4 py-2 border rounded-md">
          <option value="">See Previous Assessment</option>
          {Object.entries(assessments).map(([date, assessment]) => (
            <option key={date} value={assessment}>
              {date}: {assessment}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExerciseAssessment;
