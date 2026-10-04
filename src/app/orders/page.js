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

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Sifarişlərim</h1>

      <div className="grid gap-4">
        {orders.length === 0 && <p className="text-gray-500">Hələ sifarişin yoxdur.</p>}
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
    </div>
  );
}