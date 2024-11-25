"use client";
import { useRouter } from "next/navigation";

const ClassButton = ({ className }) => {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the page corresponding to the selected class
    router.push(`/${className}`);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
    >
      {className}
    </button>
  );
};

export default ClassButton;
