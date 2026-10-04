import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function OrdersPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const hotelBookings = await prisma.hotelBooking.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Sifarişlərim</h1>

      <h2 className="text-xl font-semibold mb-3">Biletlər</h2>
      <div className="grid gap-4 mb-10">
        {orders.length === 0 && <p className="text-gray-500">Hələ biletin yoxdur.</p>}
        {orders.map((o) => (
          <Link
            key={o.id}
            href={`/orders/${o.id}`}
            className="bg-white rounded-xl shadow p-5 flex justify-between hover:shadow-md"
          >
            <div>
              <p className="font-semibold">{o.from} → {o.to}</p>
              <p className="text-sm text-gray-500">{o.airline} · {o.date || "tarix yoxdur"}</p>
            </div>
            <p className="font-bold text-blue-600">{o.price} $</p>
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-3">Otel rezervasiyaları</h2>
      <div className="grid gap-4">
        {hotelBookings.length === 0 && <p className="text-gray-500">Hələ otel rezervasiyan yoxdur.</p>}
        {hotelBookings.map((b) => (
          <Link
            key={b.id}
            href={`/hotel-bookings/${b.id}`}
            className="bg-white rounded-xl shadow p-5 flex justify-between hover:shadow-md"
          >
            <div>
              <p className="font-semibold">{b.hotelName}</p>
              <p className="text-sm text-gray-500">
                {b.checkIn} → {b.checkOut} · {b.nights} gecə
              </p>
            </div>
            <p className="font-bold text-blue-600">{b.totalPrice} $</p>
          </Link>
        ))}
      </div>
    </div>
  );
}