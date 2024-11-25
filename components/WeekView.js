export default function WeekView({ weekData }) {
  if (!weekData) {
    return (
      <div className="text-center text-gray-500">No data for this week.</div>
    );
  }

  return (
    <div className="w-full max-w-sm bg-white p-4 rounded shadow">
      {Object.entries(weekData).map(([day, content]) => (
        <div key={day} className="mb-4">
          <h2 className="font-semibold text-lg text-gray-800">{day}</h2>
          <p className="text-gray-600">{content}</p>
        </div>
      ))}
    </div>
  );
}
