"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { flights } from "@/data/flights";

export async function createOrder(formData) {
  const session = await auth();
  if (!session) redirect("/login");

  const flightId = Number(formData.get("flightId"));
  const date = String(formData.get("date") || "");
  const passengerName = String(formData.get("passengerName") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const flight = flights.find((f) => f.id === flightId);
  if (!flight || !passengerName || !phone) redirect("/flights");

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      flightId: flight.id,
      from: flight.from,
      to: flight.to,
      airline: flight.airline,
      departure: flight.departure,
      arrival: flight.arrival,
      date,
      price: flight.price,
      passengerName,
      phone,
    },
  });

  redirect(`/orders/${order.id}`);
}