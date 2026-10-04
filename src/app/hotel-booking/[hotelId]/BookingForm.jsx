"use client";

import { useActionState, useState } from "react";
import { createHotelBooking } from "./actions";

export default function BookingForm({ hotel, orderId, defaultCheckIn, today }) {
  const [error, formAction, pending] = useActionState(createHotelBooking, null);
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState("");

  const nights =
    checkIn && checkOut
      ? Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000)
      : 0;
  const total = nights > 0 ? nights * hotel.pricePerNight : 0;

  const inputClass = "w-full border rounded-lg px-3 py-2";

  return (
    <form action={formAction} className="bg-white rounded-2xl shadow-lg p-6 grid gap-4">
      <input type="hidden" name="hotelId" value={hotel.id} />
      <input type="hidden" name="orderId" value={orderId || ""} />

      <div>
        <label className="block text-sm mb-1">Qonaq adı və soyadı</label>
        <input name="guestName" required className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Giriş tarixi</label>
          <input
            type="date"
            name="checkIn"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Çıxış tarixi</label>
          <input
            type="date"
            name="checkOut"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
            className={inputClass}
          />
        </div>
      </div>

      {nights > 0 && (
        <p className="text-gray-700">
          {nights} gecə × {hotel.pricePerNight} $ ={" "}
          <span className="font-bold text-blue-600">{total} $</span>
        </p>
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? "Gözlə..." : "Rezervi təsdiqlə"}
      </button>
    </form>
  );
}