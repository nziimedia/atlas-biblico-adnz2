"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import {BookOpen,Search,Route,Presentation,ChevronRight} from "lucide-react";
import {places,lesson13} from "@/lib/atlas-data";
import AtlasMap from "@/components/AtlasMap";
export default function AtlasClient(){
 const [q,setQ]=useState(""); const [professor,setProfessor]=useState(false);
 const filtered=useMemo(()=>places.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||p.region.toLowerCase().includes(q.toLowerCase())),[q]);
 return <main className="h-screen overflow-hidden bg-[#07111f] text-white"><AtlasMap selectedIds={lesson13.places}/>
 <aside className="absolute left-4 top-4 z-20 flex max-h-[calc(100vh-2rem)] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#081322]/95 shadow-2xl backdrop-blur">
 <div className="border-b border-white/10 p-5"><div className="flex items-center justify-between"><Link href="/" className="text-sm text-slate-300">← Atlas Bíblico</Link><button onClick={()=>setProfessor(!professor)} className="inline-flex items-center gap-2 rounded-xl border border-amber-400/30 px-3 py-2 text-xs text-amber-200"><Presentation size={14}/>{professor?"Sair":"Professor"}</button></div>
 <div className="mt-5 text-xs font-semibold uppercase tracking-[.2em] text-amber-400">EBD · Lição {lesson13.number}</div><h1 className="mt-2 font-serif text-3xl">{lesson13.title}</h1><p className="mt-2 text-sm text-slate-400">Texto-chave: {lesson13.reference}</p>
 <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2"><Search size={16} className="text-slate-500"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar cidade ou região..." className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600"/></div></div>
 <div className="overflow-y-auto p-3">{filtered.map((p,i)=><button key={p.slug} className="mb-2 flex w-full items-center justify-between rounded-2xl border border-white/5 bg-white/[.03] p-3 text-left hover:bg-white/[.07]" onClick={()=>window.dispatchEvent(new CustomEvent("atlas:focus",{detail:p.slug}))}><span><span className="flex items-center gap-2 font-medium"><BookOpen size={15} className="text-amber-400"/>{i+1}. {p.name}</span><span className="ml-6 text-xs text-slate-500">{p.region} · {p.modern}</span></span><ChevronRight size={16} className="text-slate-600"/></button>)}</div>
 <div className="border-t border-white/10 p-3"><div className="flex items-center gap-2 text-xs text-slate-500"><Route size={14}/> {places.length} lugares destacados · rota em desenvolvimento</div></div></aside>
 {professor&&<div className="absolute inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#07111f]/95 p-5 text-center backdrop-blur"><div className="text-xs uppercase tracking-[.2em] text-amber-400">Modo Professor</div><div className="mt-1 text-2xl font-serif">{lesson13.title}</div><div className="text-sm text-slate-400">{lesson13.reference} · use o mapa para apresentar os locais</div></div>}</main>;
}