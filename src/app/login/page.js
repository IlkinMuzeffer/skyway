"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginUser } from "./actions";

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(loginUser, null);
  const inputClass = "w-full border rounded-lg px-3 py-2";

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Giriş</h1>

      <form action={formAction} className="bg-white rounded-2xl shadow-lg p-6 grid gap-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input name="email" type="email" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm mb-1">Parol</label>
          <input name="password" type="password" className={inputClass} />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
        >
          {pending ? "Gözlə..." : "Daxil ol"}
        </button>

        <p className="text-sm text-gray-600">
          Hesabın yoxdur? <Link href="/register" className="text-blue-600">Qeydiyyat</Link>
        </p>
      </form>
    </div>
  );
}