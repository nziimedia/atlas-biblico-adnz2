import {NextResponse} from "next/server";

const knownPlaces=[
["jerusalem","Jerusalém"],["samaria","Samaria"],["caesarea","Cesareia Marítima"],["cesareia","Cesareia Marítima"],["antioquia","Antioquia da Síria"],["efeso","Éfeso"],["filipos","Filipos"],["corinto","Corinto"],["roma","Roma"],["damasco","Damasco"],["atenas","Atenas"],["bereia","Bereia"],["tessalonica","Tessalônica"],["tarso","Tarso"]
];

function clean(value:string){return value.replace(/\\s+/g," ").replace(/<[^>]+>/g," ").trim();}
function textFromHtml(html:string){return clean(html.replace(/<script[\\s\\S]*?<\\/script>/gi," ").replace(/<style[\\s\\S]*?<\\/style>/gi," "));}
function pick(html:string,patterns:RegExp[]){for(const p of patterns){const m=html.match(p);if(m?.[1])return clean(m[1]);}return "";}

export async function POST(req:Request){
 try{
  const body=await req.json() as {url?:string};
  const raw=body.url?.trim();
  if(!raw)return NextResponse.json({error:"Informe a URL da lição."},{status:400});
  const url=new URL(raw);
  if(url.protocol!=="https:"||!url.hostname.includes("escolabiblicadominical.org"))return NextResponse.json({error:"Por segurança, a importação automática está limitada ao site escolabiblicadominical.org."},{status:400});
  const response=await fetch(url,{headers:{"User-Agent":"Atlas-Biblico-ADNZII/1.0"},next:{revalidate:3600}});
  if(!response.ok)return NextResponse.json({error:"Não foi possível acessar a página da lição agora."},{status:502});
  const html=await response.text();
  const text=textFromHtml(html);
  const title=pick(html,[/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)/i,/<title[^>]*>([\\s\\S]*?)<\\/title>/i])||"Lição EBD";
  const references=[...text.matchAll(/\\b(?:Atos|Gênesis|Êxodo|Mateus|Marcos|Lucas|João|Romanos|1 Coríntios|2 Coríntios|Gálatas|Efésios|Filipenses|Colossenses|1 Tessalonicenses|2 Tessalonicenses|Hebreus|Tiago|1 Pedro|2 Pedro|Apocalipse)\\s+\\d+(?::\\d+(?:-\\d+)?)?/gi)].map(m=>m[0]);
  const uniqueRefs=[...new Set(references)].slice(0,30);
  const detectedPlaces=knownPlaces.filter(([needle])=>text.toLocaleLowerCase("pt-BR").includes(needle)).map(([,name])=>name);
  return NextResponse.json({source:url.toString(),title,detectedPlaces:[...new Set(detectedPlaces)],references:uniqueRefs.slice(0,20),message:"Importação inicial concluída. Os locais e referências detectados devem ser revisados pelo professor antes da publicação da rota."});
 }catch{return NextResponse.json({error:"URL inválida ou falha inesperada na importação."},{status:400});}
}
