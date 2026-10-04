"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hotels } from "@/data/hotels";

export async function createHotelBooking(prevState, formData) {
  const session = await auth();
  if (!session) redirect("/login");

  const hotelId = Number(formData.get("hotelId"));
  const orderId = String(formData.get("orderId") || "") || null;
  const checkIn = String(formData.get("checkIn") || "");
  const checkOut = String(formData.get("checkOut") || "");
  const guestName = String(formData.get("guestName") || "").trim();
  const hotel = hotels.find((h) => h.id === hotelId);
  if (!hotel) return "Otel tapılmadı.";
  if (!checkIn || !checkOut || !guestName) return "Bütün sahələri doldur.";

  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  if (isNaN(inDate) || isNaN(outDate)) return "Tarix düzgün deyil.";

  const nights = Math.round((outDate - inDate) / 86400000);
  if (nights < 1) return "Çıxış tarixi giriş tarixindən sonra olmalıdır.";
  if (nights > 30) return "Maksimum 30 gecə rezerv etmək olar.";

  const today = new Date().toISOString().slice(0, 10);
  if (checkIn < today) return "Giriş tarixi keçmişdə ola bilməz.";
  if (orderId) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order || order.userId !== session.user.id) return "Sifariş tapılmadı.";
  }

  const booking = await prisma.hotelBooking.create({
    data: {
      userId: session.user.id,
      orderId,
      hotelId: hotel.id,
      hotelName: hotel.name,
      city: hotel.city,
      type: hotel.type,
      checkIn,
      checkOut,
      nights,
      pricePerNight: hotel.pricePerNight,
      totalPrice: nights * hotel.pricePerNight,
      guestName,
    },
  });

  redirect(`/hotel-bookings/${booking.id}`);
}