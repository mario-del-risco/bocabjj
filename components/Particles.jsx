"use client";

import { useEffect, useState } from "react";

export default function MatrixBackground() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const generateMatrixCharacters = () => {
      const chars = [];
      const numberOfCharacters = 100; // Adjust for density
      const characters =
        "abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+[]{}|;:,.<>?";

      for (let i = 0; i < numberOfCharacters; i++) {
        chars.push({
          id: i,
          char: characters[Math.floor(Math.random() * characters.length)],
          style: {
            left: `${Math.random() * 100}%`,
            animationDelay: `${-Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
            fontSize: `${10 + Math.random() * 15}px`,
          },
        });
      }

      return chars;
    };

    setCharacters(generateMatrixCharacters());
  }, []);

  return (
    <div className="matrix-background absolute w-full h-full">
      {characters.map((char) => (
        <div key={char.id} className="matrix-character" style={char.style}>
          {char.char}
        </div>
      ))}
    </div>
  );
}
