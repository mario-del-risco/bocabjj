import WeeklyCalendar from "../../components/WeeklyCalendar";
import HomeButton from "../../components/HomeButton";

const CalendarPage = () => {
  return (
    <div className="flex items-center flex-col">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-center mt-2 font-bold w-full">Curriculum Plan</h1>
        <HomeButton className="ml-auto" />
      </div>

      <WeeklyCalendar />
    </div>
  );
};

export default CalendarPage;
