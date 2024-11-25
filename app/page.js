"use client";

import ClassButton from "../components/ClassButton"; // Import the ClassButton component

const classes = [
  "TinyChampions",
  "6-9years old",
  "9-12years old",
  "Adults",
  "Elite",
];

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">Select Your Class</h1>
      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        {classes.map((bjjclassName) => (
          <ClassButton key={bjjclassName} className={bjjclassName} />
        ))}
      </div>
    </main>
  );
}
