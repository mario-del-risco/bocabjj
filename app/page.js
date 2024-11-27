"use client";

import ClassButton from "../components/ClassButton"; // Import the ClassButton component
import Link from "next/link";
const classes = [
  "TinyChampions",
  "6-9years old",
  "9-12years old",
  "Adults",
  "Elite",
];

export default function HomePage() {
  return (
    <main className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-2xl font-bold mb-8 text-center">Select Your Class</h1>
      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        {classes.map((bjjclassName) => (
          <ClassButton key={bjjclassName} className={bjjclassName} />
        ))}
        <Link
          href="/selectStudent"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Go to Student Selection
        </Link>
        <Link
          href="/exercises"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Exercises
        </Link>
        <Link
          href="/calendar"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Calendar
        </Link>
      </div>
    </main>
  );
}
