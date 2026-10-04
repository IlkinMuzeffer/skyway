import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ✈ Skyway
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/flights" className="hover:text-blue-600">Reyslər</Link>
          <Link href="/login" className="hover:text-blue-600">Giriş</Link>
        </nav>
      </div>
    </header>
  );
}