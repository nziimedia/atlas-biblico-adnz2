import Link from "next/link";
import { lesson13, cities } from "@/lib/cities";
import AtlasMap from "@/components/AtlasMap";
import { ArrowLeft, BookOpen, Search } from "lucide-react";

export default function AtlasPage() {
  const lessonCities = cities.filter(c => lesson13.cities.includes(c.id));
  return (
    <main className="h-screen overflow-hidden bg-[#07111f] text-white">
      <div className="absolute left-4 top-4 z-20 w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-[#081322]/95 shadow-2xl backdrop-blur">
        <div className="border-b border-white/10 p-4">
          <div className="flex items-center justify-between"><Link href="/" className="flex items-center gap-2 text-sm text-slate-300"><ArrowLeft size={16}/> Atlas Bíblico</Link><span className="text-xs text-amber-400">V1</span></div>
          <h1 className="mt-4 font-serif text-2xl">Lição 13</h1><p className="mt-1 text-sm text-slate-400">{lesson13.title}</p>
          <div className="mt-3 rounded-xl bg-white/5 p-3 text-sm"><strong>{lesson13.reference}</strong> · {lessonCities.length} locais destacados</div>
        </div>
        <div className="max-h-[calc(100vh-190px)] overflow-auto p-3">
          <div className="mb-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-400"><Search size={15}/> Pesquisar cidade</div>
          {lessonCities.map(city => <div key={city.id} className="mb-2 rounded-xl border border-white/5 bg-white/[.03] p-3"><div className="flex items-center gap-2"><BookOpen size={15} className="text-amber-400"/><strong>{city.name}</strong></div><div className="mt-1 text-xs text-slate-500">{city.region} · {city.modern}</div></div>)}
        </div>
      </div>
      <div className="h-full w-full"><AtlasMap selectedIds={lesson13.cities}/></div>
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-[#081322]/90 px-4 py-2 text-xs text-slate-300 shadow-xl">Atlas Bíblico AD Nazaré II · Navegue, aproxime e clique nos locais</div>
    </main>
  );
}