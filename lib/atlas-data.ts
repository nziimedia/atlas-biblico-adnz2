export type AtlasPlace={slug:string;name:string;modern:string;region:string;country:string;lat:number;lng:number;description:string};
export const places:AtlasPlace[]=[
{slug:"jerusalem",name:"Jerusalém",modern:"Jerusalem",region:"Judeia",country:"Israel",lat:31.7683,lng:35.2137,description:"Centro religioso e político de Judá e cenário de acontecimentos importantes de Atos."},
{slug:"samaria",name:"Samaria",modern:"Sebastia",region:"Samaria",country:"Palestina",lat:32.277,lng:35.19,description:"Região destacada em Atos 8 na expansão do testemunho cristão."},
{slug:"caesarea-maritima",name:"Cesareia Marítima",modern:"Caesarea",region:"Judeia",country:"Israel",lat:32.5,lng:34.8917,description:"Porto romano importante e cenário de episódios decisivos em Atos."},
{slug:"antioquia-da-siria",name:"Antioquia da Síria",modern:"Antakya",region:"Síria",country:"Türkiye",lat:36.2021,lng:36.1606,description:"Base missionária de Paulo e Barnabé."},
{slug:"efeso",name:"Éfeso",modern:"Selçuk",region:"Ásia",country:"Türkiye",lat:37.9394,lng:27.3417,description:"Grande centro urbano da Ásia Menor e cenário de Atos 19."},
{slug:"filipos",name:"Filipos",modern:"Philippi",region:"Macedônia",country:"Grécia",lat:41.0136,lng:24.2869,description:"Cidade da Macedônia visitada por Paulo; contexto de Atos 16."},
{slug:"corinto",name:"Corinto",modern:"Corinth",region:"Acaia",country:"Grécia",lat:37.906,lng:22.8781,description:"Grande centro comercial e importante cidade do ministério de Paulo."},
{slug:"roma",name:"Roma",modern:"Rome",region:"Itália",country:"Itália",lat:41.9028,lng:12.4964,description:"Destino final da viagem de Paulo a Roma em Atos."}];
export const lesson13={number:13,title:"A Missão Continua em Nós",reference:"Atos 1:8",places:places.map(p=>p.slug)};