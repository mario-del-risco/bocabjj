"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../firebase.config";
import { ref, onValue } from "firebase/database";

const ExerciseDetailPage = () => {
  const [exercise, setExercise] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const exerciseId = params.exerciseId;

  useEffect(() => {
    if (!exerciseId) {
      console.warn("No exerciseId found in params.");
      setIsLoading(false);
      return;
    }

    const exercisesRef = ref(db, "exercises/exercises"); // Correct path

    const unsubscribe = onValue(
      exercisesRef,
      (snapshot) => {
        const data = snapshot.val();

        if (!data || !Array.isArray(data)) {
          console.error("Invalid exercises data:", data);
          setExercise(null);
        } else {
          // Find the exercise with the matching ID
          const foundExercise = data.find(
            (exercise) => exercise.id === exerciseId
          );
          setExercise(foundExercise || null);
        }

        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching exercises:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup on unmount
  }, [exerciseId]);

  if (isLoading) {
    return <div className="text-center p-8">Loading exercise details...</div>;
  }

  if (!exercise) {
    return <div className="text-center p-8">Exercise not found</div>;
  }

  return (
    <div className="container mx-auto p-4 m-2">
      <h1 className="text-3xl font-bold text-center mb-8">{exercise.name}</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <p className="text-gray-600 mb-6">{exercise.description}</p>

        {exercise.steps && (
          <>
            <h3 className="text-xl font-bold mb-4">Steps:</h3>
            <ol className="list-decimal pl-6 mb-6">
              {exercise.steps.map((step, index) => (
                <li key={index} className="mb-3">
                  <span className="font-bold">
                    {step.stepNumber || index + 1}.{" "}
                  </span>
                  {step.instruction}
                </li>
              ))}
            </ol>
          </>
        )}

        {exercise.tags && (
          <>
            <h3 className="text-xl font-bold mb-4">Tags:</h3>
            <ul className="list-disc pl-6">
              {exercise.tags.map((tag, index) => (
                <li key={index} className="mb-2">
                  {tag}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ExerciseDetailPage;
