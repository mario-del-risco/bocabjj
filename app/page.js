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
    <main className="flex items-center justify-center w-full h-max max-h-max  flex-col">
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
          className="relative bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out group overflow-hidden"
        >
          <div className="absolute inset-0 bg-pattern grid grid-cols-6 gap-4 opacity-10 group-hover:opacity-20">
            {[...Array(36)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 text-white"
              >
                <path
                  d="M12 4v16m8-8H4"
                  strokeWidth="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ))}
          </div>
          <span className="relative font-semibold tracking-wide text-lg uppercase">
            Exercises
          </span>
        </Link>

        <Link
          href="/calendar"
          className="relative bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out group overflow-hidden"
        >
          <div className="absolute inset-0 bg-pattern grid grid-cols-7 gap-4 opacity-10 group-hover:opacity-20">
            {Array.from({ length: 49 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-white rounded-full animate-pulse"
                style={{
                  animationDelay: `${(i % 7) * 0.05}s`,
                }}
              ></div>
            ))}
          </div>
          <span className="relative font-semibold tracking-wide text-lg uppercase">
            Calendar
          </span>
        </Link>

        <Link
          href="/diagrams"
          className="relative bg-gradient-to-r from-orange-400 to-red-600 text-white px-6 py-3 rounded-lg shadow-lg text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out group overflow-hidden"
        >
          <div className="absolute inset-0 bg-pattern grid grid-cols-6 gap-4 opacity-10 group-hover:opacity-20">
            {[...Array(36)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 text-white"
              >
                <path
                  d="M3 10h4v4H3zm14 0h4v4h-4zM10 3v4m4 0V3m0 14v4m-4 0v-4m0-4h4v4h-4z"
                  strokeWidth="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ))}
          </div>
          <span className="relative font-semibold tracking-wide text-lg uppercase">
            Diagrams
          </span>
        </Link>
      </div>
    </main>
  );
}
