import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { airports } from "@/data/airports";
import { hotels } from "@/data/hotels";
import HotelCard from "@/components/HotelCard";

const types = ["Hamısı", "Otel", "Mənzil", "Hostel"];

export default async function OrderPage({ params, searchParams }) {
  const session = await auth();
  if (!session) redirect("/login");

  const { id } = await params;
  const { type } = await searchParams;

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order || order.userId !== session.user.id) notFound();

  const destination = airports.find((a) => a.code === order.to);
  const cityName = destination ? destination.city : order.to;

  const cityHotels = hotels
    .filter((h) => h.city === order.to)
    .filter((h) => !type || type === "Hamısı" || h.type === type)
    .sort((a, b) => a.pricePerNight - b.pricePerNight);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Sifariş təsdiqləndi ✅</h1>
      <p className="text-gray-600 mb-6">Sifariş nömrəsi: {order.id}</p>

      <div className="bg-white rounded-xl shadow p-5 grid gap-1">
        <p className="text-sm text-gray-500">{order.airline}</p>
        <p className="text-xl font-semibold">
          {order.departure} → {order.arrival}
        </p>
        <p className="text-sm text-gray-500">
          {order.from} → {order.to} · {order.date || "tarix yoxdur"}
        </p>
        <p className="mt-2">Sərnişin: {order.passengerName}</p>
        <p className="text-2xl font-bold text-blue-600">{order.price} $</p>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-1">{cityName} şəhərində qalma yerləri</h2>
      <p className="text-gray-600 mb-4">Ən ucuzdan bahaya sıralanıb.</p>

      <div className="flex gap-2 mb-4">
        {types.map((t) => {
          const active = (type || "Hamısı") === t;
          return (
            <Link
              key={t}
              href={`/orders/${order.id}?type=${t}`}
              className={`rounded-full px-4 py-1.5 text-sm border ${
                active ? "bg-blue-600 text-white border-blue-600" : "bg-white hover:bg-gray-50"
              }`}
            >
              {t}
            </Link>
          );
        })}
      </div>

      <div className="grid gap-3">
        {cityHotels.length > 0 ? (
          cityHotels.map((h) => <HotelCard key={h.id} hotel={h} cityName={cityName} orderId={order.id} />)
        ) : (
          <p className="text-gray-500">Bu filtr üzrə qalma yeri tapılmadı.</p>
        )}
      </div>

      <div className="bg-blue-50 rounded-xl p-5 mt-8">
        <p className="font-semibold">Aeroportdan taksi</p>
        <p className="text-sm text-gray-600">Növbəti addımda burada aeroporta taksi sifarişi əlavə edəcəyik.</p>
      </div>

      <Link href="/orders" className="inline-block mt-6 text-blue-600">
        Bütün sifarişlərim →
      </Link>
    </div>
  );
}