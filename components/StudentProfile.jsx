"use client";
import React, { useState, useEffect } from "react";
import { db } from "../firebase.config";
import { ref, onValue } from "firebase/database";
import BeltDisplay from "../components/BeltDisplay";

const beltLevels = {
  1: "White Belt",
  2: "White Belt with One Gray Stripe",
  3: "White Belt with Two Gray Stripes",
  4: "White Belt half Gray",
};
const StudentProfile = ({ studentId }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const studentRef = ref(db, `students/${studentId}`);

    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      setStudent(data);
    });
  }, [studentId]);

  return (
    <div>
      {student && (
        <div>
          <h2>{student.name}</h2>
          <p>Level: {beltLevels[student.beltLevel] || "Unknown"}</p>
          <BeltDisplay beltLevel={student.beltLevel} />
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
