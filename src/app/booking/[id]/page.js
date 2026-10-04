import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { flights } from "@/data/flights";
import { createOrder } from "./actions";

export default async function BookingPage({ params, searchParams }) {
  const session = await auth();
  if (!session) redirect("/login");

  const { id } = await params;
  const { date } = await searchParams;
  const flight = flights.find((f) => f.id === Number(id));
  if (!flight) notFound();

  const inputClass = "w-full border rounded-lg px-3 py-2";

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Sifarişi tamamla</h1>

      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <p className="text-sm text-gray-500">{flight.airline}</p>
        <p className="text-xl font-semibold">
          {flight.departure} → {flight.arrival}
        </p>
        <p className="text-sm text-gray-500">
          {flight.from} → {flight.to} · {date || "tarix seçilməyib"}
        </p>
        <p className="text-2xl font-bold text-blue-600 mt-2">{flight.price} $</p>
      </div>

      <form action={createOrder} className="bg-white rounded-2xl shadow-lg p-6 grid gap-4">
        <input type="hidden" name="flightId" value={flight.id} />
        <input type="hidden" name="date" value={date || ""} />

        <div>
          <label className="block text-sm mb-1">Sərnişinin adı və soyadı</label>
          <input name="passengerName" required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm mb-1">Telefon</label>
          <input name="phone" type="tel" required className={inputClass} />
        </div>

        <button className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
          Sifarişi təsdiqlə
        </button>
      </form>
    </div>
  );
}