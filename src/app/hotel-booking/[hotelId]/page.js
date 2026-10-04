import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hotels } from "@/data/hotels";
import BookingForm from "./BookingForm";

export default async function HotelBookingPage({ params, searchParams }) {
  const session = await auth();
  if (!session) redirect("/login");

  const { hotelId } = await params;
  const { orderId } = await searchParams;

  const hotel = hotels.find((h) => h.id === Number(hotelId));
  if (!hotel) notFound();
  let defaultCheckIn = "";
  if (orderId) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (order && order.userId === session.user.id) defaultCheckIn = order.date || "";
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Otel rezervasiyası</h1>

      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <p className="font-semibold text-lg">{hotel.name}</p>
        <p className="text-sm text-gray-500">
          {hotel.type} · {hotel.area} · {"★".repeat(hotel.stars)}
        </p>
        <p className="text-2xl font-bold text-blue-600 mt-2">
          {hotel.pricePerNight} $ <span className="text-sm font-normal text-gray-500">gecəlik</span>
        </p>
      </div>

      <BookingForm
        hotel={hotel}
        orderId={orderId}
        defaultCheckIn={defaultCheckIn}
        today={today}
      />
    </div>
  );
}