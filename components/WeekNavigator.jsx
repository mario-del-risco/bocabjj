export default function WeekNavigator({ onChange }) {
  return (
    <div className="flex justify-between w-full max-w-sm mb-4">
      <button
        onClick={() => onChange(-1)}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        Previous Week
      </button>
      <button
        onClick={() => onChange(1)}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        Next Week
      </button>
    </div>
  );
}
