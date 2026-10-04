"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { airports } from "@/data/airports";

export default function SearchForm() {
  const router = useRouter();
  const [from, setFrom] = useState("GYD");
  const [to, setTo] = useState("IST");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    router.push(`/flights?from=${from}&to=${to}&date=${date}`);
  }

  const selectClass = "w-full border rounded-lg px-3 py-2";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-6 grid gap-4 md:grid-cols-4"
    >
      <div>
        <label className="block text-sm mb-1">Haradan</label>
        <select value={from} onChange={(e) => setFrom(e.target.value)} className={selectClass}>
          {airports.map((a) => (
            <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">Hara</label>
        <select value={to} onChange={(e) => setTo(e.target.value)} className={selectClass}>
          {airports.map((a) => (
            <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">Tarix</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={selectClass}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg px-4 py-2 mt-6 hover:bg-blue-700"
      >
        Reys axtar
      </button>
    </form>
  );
}