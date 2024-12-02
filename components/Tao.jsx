"use client";
import React, { useEffect, useState } from "react";
import { getTaoData } from "./dataConnect"; // Adjust the path accordingly
import { Protest_Revolution } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Protest_Revolution({
  subsets: ["latin"],
  weight: "400",
});

const Tao = () => {
  const [proverb, setProverb] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taoData = await getTaoData();
        // Select a random proverb from the fetched data
        const randomIndex = Math.floor(Math.random() * taoData.length);
        let poem = taoData[randomIndex].passage.poem;

        // Replace any incorrect </br> with <br>
        poem = poem.replace(/<\/br>/g, "<br>");

        setProverb(poem);
      } catch (error) {
        console.error("Error fetching Tao data: ", error);
      }
    };

    fetchData();
  }, []);

  if (!proverb) {
    return <div>Loading...</div>;
  }

  return (
    <div className={inter.className}>
      <div className="   text-center mt-10 mb-10 drop-shadow-xl">
        {/* Render the proverb with corrected HTML tags like <br> */}
        <p dangerouslySetInnerHTML={{ __html: proverb }} />
      </div>
    </div>
  );
};

export default Tao;
