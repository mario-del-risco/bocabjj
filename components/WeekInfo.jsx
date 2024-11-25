import { useEffect, useState } from "react";
import getCurrentWeek from "../utils/getCurrentWeek"; // Import the utility function

const WeekInfo = () => {
  const [weekData, setWeekData] = useState(null);

  useEffect(() => {
    const { weekStart, weekEnd } = getCurrentWeek();
    setWeekData({
      start: new Date(weekStart).toLocaleDateString(), // Format the date for display
      end: new Date(weekEnd).toLocaleDateString(),
    });
  }, []);

  if (!weekData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="week-info">
      <h2 className="text-xl font-semibold">Current Week</h2>
      <p>Week Start: {weekData.start}</p>
      <p>Week End: {weekData.end}</p>
    </div>
  );
};

export default WeekInfo;
