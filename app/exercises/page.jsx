"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase.config";
import { ref, onValue } from "firebase/database";

const ExercisePage = () => {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const exercisesRef = ref(db, "exercises");

    onValue(exercisesRef, (snapshot) => {
      const data = snapshot.val();
      setExercises(data.filter((exercise) => exercise !== null)); // Filter out nulls
      setIsLoading(false);
    });
  }, []);

  return (
    <div className=" mx-auto p-4 m-2">
      <h1 className="text-3xl font-bold text-center mb-8">Exercises</h1>
      {isLoading ? (
        <p>Loading exercises...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 overflow-scroll mt-40">
          {exercises.map((exercise, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-2">
                {exercise.exerciseName}
              </h2>
              <p className="text-gray-600 mb-4">{exercise.description}</p>
              <h3 className="text-lg font-bold mb-2">Steps:</h3>
              <ol className="list-decimal pl-6">
                {exercise.steps.map((step) => (
                  <li key={step.stepNumber} className="mb-2">
                    <span className="font-bold">{step.stepNumber}. </span>
                    {step.instruction}
                  </li>
                ))}
              </ol>
              <h3 className="text-lg font-bold mb-2">Targeted Skills:</h3>
              <ul className="list-disc pl-6">
                {exercise.targetedSkills.map((skill) => (
                  <li key={skill} className="mb-2">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExercisePage;
