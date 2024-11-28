"use client";
import ClassButton from "../components/ClassButton"; // Import the ClassButton component
import Link from "next/link";
import { auth } from "../firebase.config"; // Import your Firebase auth
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import { useState, useEffect } from "react";

const classes = [
  "TinyChampions",
  "6-9years old",
  "9-12years old",
  "Adults",
  "Elite",
];

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // You might want to redirect to another page after successful sign-in
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen flex-col">
      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        {user ? (
          <>
            <div className="text-2xl font-bold mb-8 text-center">
              <h1>
                Welcome{" "}
                <span className=" font-extrabold text-pretty text-blue-700">
                  {user.displayName}
                </span>{" "}
                to CandelaJitsu! ✨👊
              </h1>
              <p className=" font-thin text-opacity-50 font-">
                Home of Boca Jiu Jitsu Curriculum
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="text-2xl font-bold mb-8 text-center">
              <h1>Welcome to CandelaJitsu! ✨👊</h1>
              <p className=" font-thin text-opacity-50 font-">
                Home of Boca Jiu Jitsu Curriculum
              </p>
            </div>
            <button
              onClick={handleGoogleSignIn}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md font-bold hover:bg-blue-600 transition-all"
            >
              Sign In with Google
            </button>
          </>
        )}

        <Link
          href="/exercises"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md text-center hover:bg-blue-600 transition-all"
        >
          Exercises
        </Link>
        <Link
          href="/calendar"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md text-center hover:bg-blue-600 transition-all"
        >
          Calendar
        </Link>
      </div>
    </main>
  );
}
