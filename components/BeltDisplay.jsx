"use client";
import React from "react";

const BeltDisplay = ({ beltLevel }) => {
  // Define the belt structure based on belt level
  const getStripes = (beltLevel) => {
    switch (beltLevel) {
      case 2: // White with one gray stripe
        return ["white", "gray", "white"];
      case 3: // White with two gray stripes
        return ["white", "gray", "white", "gray", "white"];
      case 4: // Half gray belt
        return ["white", "gray"];
      default: // Plain white belt
        return ["white"];
    }
  };

  const stripes = getStripes(beltLevel);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Stack stripes vertically
        height: "60px", // Fixed total height
        overflow: "hidden", // Prevent overflow
      }}
      className="border-4 border-e-zinc-950"
    >
      {stripes.map((color, index) => (
        <div
          key={index}
          style={{
            backgroundColor: color === "white" ? "#fff" : "#808080", // Gray for stripes
            height: `${100 / stripes.length}%`, // Proportional height
            width: "100%",
          }}
        ></div>
      ))}
    </div>
  );
};

export default BeltDisplay;
