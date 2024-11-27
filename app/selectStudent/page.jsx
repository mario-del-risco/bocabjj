"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase.config";
import { ref, onValue } from "firebase/database";
import Link from "next/link"; // Import Link for navigation

const StudentSelection = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const studentsRef = ref(db, "students");

    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      setStudents(
        Object.entries(data).map(([studentId, studentData]) => ({
          studentId,
          ...studentData,
        }))
      );
    });
  }, []);

  return (
    <div>
      <h1>Student Selection</h1>
      <ul>
        {students.map((student) => (
          <li key={student.studentId}>
            <Link href={`/student/${student.studentId}`}>{student.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentSelection;
