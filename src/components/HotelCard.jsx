export default function HotelCard({ hotel, cityName }) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${hotel.name} ${cityName}`
  )}`;

  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">{hotel.name}</p>
          <span className="text-xs bg-gray-100 text-gray-700 rounded px-2 py-0.5">{hotel.type}</span>
        </div>
        <p className="text-sm text-gray-500">
          {hotel.area} · {"★".repeat(hotel.stars)}
        </p>
        <p className="text-sm text-gray-500">Qiymətləndirmə: {hotel.rating} / 10</p>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold text-blue-600">{hotel.pricePerNight} $</p>
        <p className="text-xs text-gray-500">gecəlik</p>
        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          Xəritədə bax
        </a>
      </div>
    </div>
  );
}