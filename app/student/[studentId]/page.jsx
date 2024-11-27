"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../firebase.config";
import { ref, onValue, update } from "firebase/database";
import BeltDisplay from "../../../components/BeltDisplay"; // Import your BeltDisplay component
import ExerciseAssessment from "../../../components/ExerciseAssessment"; // Import the new component

const beltLevels = {
  1: "White Belt",
  2: "White Belt with One Gray Stripe",
  3: "White Belt with Two Gray Stripes",
  4: "White Belt half Gray",
};

const StudentProfile = () => {
  const params = useParams();
  const studentId = params.studentId;
  const [student, setStudent] = useState(null);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const studentRef = ref(db, `students/${studentId}`);
    const exercisesRef = ref(db, "exercises");

    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      setStudent(data);
    });

    onValue(exercisesRef, (snapshot) => {
      const data = snapshot.val();
      setExercises(data.slice(1)); // Remove the first null element
    });
  }, [studentId]);

  return (
    <div className="max-w-screen">
      {student && (
        <div>
          <h2>{student.name}</h2>
          <p>Level: {beltLevels[student.beltLevel] || "Unknown"}</p>
          <BeltDisplay beltLevel={student.beltLevel} />

          <h3 className="mt-4">Exercises:</h3>
          <ul>
            {exercises.map((exercise, index) => (
              <li key={index} className="mb-2">
                <ExerciseAssessment studentId={studentId} exercise={exercise} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
