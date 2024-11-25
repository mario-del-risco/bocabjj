const getCurrentWeek = () => {
  const currentDate = new Date();

  // Get the current day (0-6) where 0 is Sunday and 6 is Saturday
  const currentDay = currentDate.getDay();

  // Get the difference in days from Sunday (which is 0)
  const daysToSunday = currentDay === 0 ? 6 : currentDay - 1;

  // Get the start of the current week (Monday)
  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() - daysToSunday);
  weekStart.setHours(0, 0, 0, 0); // Set to the beginning of the day (midnight)

  // Get the end of the current week (Sunday)
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6); // Add 6 days to get to Sunday
  weekEnd.setHours(23, 59, 59, 999); // Set to the end of the day (11:59 PM)

  // Return the start and end dates of the week
  return {
    weekStart: weekStart.toISOString(),
    weekEnd: weekEnd.toISOString(),
  };
};

export default getCurrentWeek;
