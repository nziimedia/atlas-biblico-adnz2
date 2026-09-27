import {NextResponse} from "next/server";

const knownPlaces=[
["jerusalém","Jerusalém"],["jerusalem","Jerusalém"],["samaria","Samaria"],["cesareia","Cesareia Marítima"],["caesarea","Cesareia Marítima"],["antioquia","Antioquia da Síria"],["éFeso","Éfeso"],["efeso","Éfeso"],["filipos","Filipos"],["corinto","Corinto"],["roma","Roma"],["damasco","Damasco"],["atenas","Atenas"],["bereia","Bereia"],["tessalônica","Tessalônica"],["tessalonica","Tessalônica"],["tarso","Tarso"]
];

function clean(value:string){return value.replace(/\s+/g," ").replace(/<[^>]+>/g," ").trim();}
function textFromHtml(html:string){return clean(html.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," "));}
function pick(html:string,patterns:RegExp[]){for(const p of patterns){const m=html.match(p);if(m?.[1])return clean(m[1]);}return "";}

export async function POST(req:Request){
 try{
  const body=await req.json() as {url?:string};
  const raw=body.url?.trim();
  if(!raw)return NextResponse.json({error:"Informe a URL da lição."},{status:400});
  const url=new URL(raw);
  if(url.protocol!=="https:"||!(url.hostname==="escolabiblicadominical.org"||url.hostname.endsWith(".escolabiblicadominical.org")))return NextResponse.json({error:"Por segurança, a importação automática está limitada ao site escolabiblicadominical.org."},{status:400});
  const response=await fetch(url,{headers:{"User-Agent":"Atlas-Biblico-ADNZII/1.0"},next:{revalidate:3600}});
  if(!response.ok)return NextResponse.json({error:"Não foi possível acessar a página da lição agora."},{status:502});
  const html=await response.text();
  const text=textFromHtml(html);
  const title=pick(html,[/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)/i,/<title[^>]*>([\s\S]*?)<\/title>/i])||"Lição EBD";
  const theme=pick(html,[/(?:TEMA:)\s*([^|<]+)/i]);
  const goldenText=pick(html,[/TEXTO ÁUREO[\s\S]{0,600}?["“]([^"”]+)["”]/i]);
  const classReading=pick(html,[/LEITURA BÍBLICA EM CLASSE[\s\S]{0,700}?((?:Mateus|Marcos|Lucas|João|Atos|Romanos|1 Coríntios|2 Coríntios|Gálatas|Efésios|Filipenses|Colossenses|Hebreus|Tiago|1 Pedro|2 Pedro|Apocalipse)[^<]{0,160})/i]);
  const references=[...text.matchAll(/\b(?:Atos|Gênesis|Êxodo|Mateus|Marcos|Lucas|João|Romanos|1 Coríntios|2 Coríntios|Gálatas|Efésios|Filipenses|Colossenses|1 Tessalonicenses|2 Tessalonicenses|Hebreus|Tiago|1 Pedro|2 Pedro|Apocalipse)\s+\d+(?:(?:[.:]\d+(?:[-–]\d+)?)|(?:,\d+(?:[-–]\d+)?))*?/gi)].map(m=>m[0]);
  const uniqueRefs=[...new Set(references)].slice(0,30);
  const lower=text.toLocaleLowerCase("pt-BR");
  const detectedPlaces=knownPlaces.filter(([needle])=>lower.includes(needle.toLocaleLowerCase("pt-BR"))).map(([,name])=>name);
  return NextResponse.json({source:url.toString(),title,theme,goldenText,classReading,detectedPlaces:[...new Set(detectedPlaces)],references:uniqueRefs.slice(0,20),message:"Importação concluída. Antes de salvar uma rota definitiva, o professor deve revisar os locais detectados e sua relação com a aula."});
 }catch{return NextResponse.json({error:"URL inválida ou falha inesperada na importação."},{status:400});}
}
