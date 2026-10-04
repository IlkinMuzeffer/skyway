import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ✈ Skyway
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/flights" className="hover:text-blue-600">Reyslər</Link>

          {session ? (
            <>
              <Link href="/orders" className="hover:text-blue-600">Sifarişlərim</Link>
              <span className="text-gray-600">Salam, {session.user.name}</span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button className="hover:text-blue-600">Çıxış</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-600">Giriş</Link>
              <Link href="/register" className="bg-blue-600 text-white rounded-lg px-3 py-1.5 hover:bg-blue-700">
                Qeydiyyat
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}