import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2">Ucuz aviabiletləri tap</h1>
      <p className="text-gray-600 mb-8">Yüzlərlə istiqamət, bir axtarış.</p>
      <SearchForm />
    </div>
  );
}