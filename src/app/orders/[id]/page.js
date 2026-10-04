import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function OrderPage({ params }) {
  const session = await auth();
  if (!session) redirect("/login");

  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order || order.userId !== session.user.id) notFound();

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
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

      <div className="bg-blue-50 rounded-xl p-5 mt-6">
        <p className="font-semibold">Otellər və qalma yerləri</p>
        <p className="text-sm text-gray-600">Növbəti addımda burada təyinat şəhərindəki otelləri göstərəcəyik.</p>
      </div>

      <Link href="/orders" className="inline-block mt-6 text-blue-600">
        Bütün sifarişlərim →
      </Link>
    </div>
  );
}