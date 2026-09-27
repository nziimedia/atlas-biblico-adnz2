import Link from "next/link";
import { ArrowRight, BookOpen, Landmark, MapPinned } from "lucide-react";

export default function Home() {
  const cards = [
    [BookOpen, "Lições EBD", "Selecione uma lição e destaque os lugares estudados."],
    [MapPinned, "Mapa interativo", "Zoom, navegação, marcadores e contexto de cada cidade."],
    [Landmark, "Arqueologia", "Camada dedicada a sítios e referências arqueológicas."]
  ];
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <header className="border-b border-white/10 bg-[#07111f]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div><div className="text-sm font-semibold tracking-[.2em] text-amber-400">AD NAZARÉ II</div><div className="font-serif text-lg">Atlas Bíblico</div></div>
          <Link href="/atlas" className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950">Abrir Atlas</Link>
        </div>
      </header>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1.2fr_.8fr] md:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm text-amber-200"><MapPinned size={16}/> Geografia · Arqueologia · EBD</div>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.02] md:text-7xl">A Bíblia no mapa.<br/><span className="text-amber-400">A história em contexto.</span></h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">Um atlas interativo para visualizar cidades, regiões, rotas missionárias e o contexto histórico das lições da Escola Bíblica Dominical.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/atlas" className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-slate-950">Explorar o mapa <ArrowRight size={18}/></Link><Link href="/atlas?lesson=13" className="rounded-xl border border-white/15 px-6 py-3 text-slate-200">Ver Lição 13</Link></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
          {cards.map(([Icon,title,desc]) => { const I=Icon as typeof BookOpen; return <div key={title as string} className="rounded-2xl border border-white/10 bg-white/[.04] p-5"><I className="text-amber-400"/><h2 className="mt-4 font-semibold">{title as string}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{desc as string}</p></div> })}
        </div>
      </section>
    </main>
  );
}