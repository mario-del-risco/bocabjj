"use client";
import ClassButton from "../components/ClassButton";
import Tao from "../components/Tao"; // Import the ClassButton component
import Link from "next/link";
import { auth } from "../firebase.config"; // Import your Firebase auth
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import CenteredIframe from "../components/CenteredIframe";

import { useState, useEffect } from "react";

import { Protest_Revolution } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Protest_Revolution({
  subsets: ["latin"],
  weight: "400",
});

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
      <div className="grid grid-cols-1 gap-4 w-full max-w-sm shadow-2xl p-6 rounded-xl">
        {user ? (
          <>
            <div className="text-3xl font-bold mb-8 text-center drop-shadow-2xl">
              <h1 className={inter.className}>
                ⛩️ Welcome{" "}
                <span className=" font-extrabold text-pretty text-blue-700">
                  {user.displayName}
                </span>{" "}
                ⛩️
              </h1>
            </div>
          </>
        ) : (
          <>
            <div className="text-4xl font-extrabold mb-8 text-center">
              <h1 className={inter.className}>⛩️ Welcome ⛩️</h1>
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
          className="relative bg-gradient-to-r from-blue-600 to-slate-900 text-white px-6 py-3 rounded-lg shadow-lg text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out group overflow-hidden"
        >
          <span className="relative tracking-widest uppercase text-2xl font-light antialiased">
            Exercises
          </span>
        </Link>

        <Link
          href="/calendar"
          className="relative bg-gradient-to-r from-red-600 to-slate-900 text-white px-6 py-3 rounded-lg shadow-lg text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out group overflow-hidden"
        >
          <span className="relative tracking-widest uppercase text-2xl font-light antialiased">
            Calendar
          </span>
        </Link>

        <Link
          href="/diagrams"
          className="relative bg-gradient-to-r from-orange-400 to-slate-900 text-white px-6 py-3 rounded-lg shadow-lg text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out group overflow-hidden"
        >
          <span className="relative tracking-widest uppercase text-2xl font-light antialiased">
            Diagrams
          </span>
        </Link>

        <Tao />
      </div>
    </main>
  );
}
