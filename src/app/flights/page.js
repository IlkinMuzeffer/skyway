import { redirect } from "next/navigation";
import { auth } from "@/auth";
import FlightCard from "@/components/FlightCard";
import SearchForm from "@/components/SearchForm";
import { flights } from "@/data/flights";

export default async function FlightsPage({ searchParams }) {
  const session = await auth();
  if (!session) redirect("/login");

  const { from, to } = await searchParams;

  const results = flights.filter(
    (f) => (!from || f.from === from) && (!to || f.to === to)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <SearchForm />

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        {from && to ? `${from} → ${to}` : "Bütün reyslər"}
      </h2>

      <div className="grid gap-4">
        {results.length > 0 ? (
          results.map((f) => <FlightCard key={f.id} flight={f} />)
        ) : (
          <p className="text-gray-500">Bu istiqamətdə reys tapılmadı.</p>
        )}
      </div>
    </div>
  );
}