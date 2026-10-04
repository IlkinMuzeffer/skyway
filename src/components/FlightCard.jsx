export default function FlightCard({ flight }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{flight.airline}</p>
        <p className="text-xl font-semibold">
          {flight.departure} → {flight.arrival}
        </p>
        <p className="text-sm text-gray-500">
          {flight.from} → {flight.to} · {flight.duration}
        </p>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-blue-600">{flight.price} $</p>
        <button className="mt-2 bg-blue-600 text-white rounded-lg px-4 py-1.5 hover:bg-blue-700">
          Seç
        </button>
      </div>
    </div>
  );
}