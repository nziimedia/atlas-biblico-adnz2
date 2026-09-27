export type City = {
  id: string;
  name: string;
  modern: string;
  country: string;
  lat: number;
  lng: number;
  region: string;
  testament: "AT" | "NT";
  note: string;
};

export const cities: City[] = [
  {id:"jerusalem",name:"Jerusalém",modern:"Jerusalem",country:"Israel",lat:31.7683,lng:35.2137,region:"Judeia",testament:"NT",note:"Centro religioso e político de Judá; cenário de muitos acontecimentos de Atos."},
  {id:"antioch-syria",name:"Antioquia da Síria",modern:"Antakya",country:"Türkiye",lat:36.2021,lng:36.1606,region:"Síria",testament:"NT",note:"Base missionária de Paulo e Barnabé."},
  {id:"ephesus",name:"Éfeso",modern:"Selçuk",country:"Türkiye",lat:37.9394,lng:27.3417,region:"Ásia",testament:"NT",note:"Importante centro urbano da Ásia Menor e cenário de Atos 19."},
  {id:"philippi",name:"Filipos",modern:"Philippi",country:"Grécia",lat:41.0136,lng:24.2869,region:"Macedônia",testament:"NT",note:"Cidade da Macedônia visitada por Paulo; contexto de Atos 16 e da Epístola aos Filipenses."},
  {id:"corinth",name:"Corinto",modern:"Corinth",country:"Grécia",lat:37.906,lng:22.8781,region:"Acaia",testament:"NT",note:"Grande centro comercial; Paulo permaneceu ali por período significativo."},
  {id:"caesarea",name:"Cesareia Marítima",modern:"Caesarea",country:"Israel",lat:32.5,lng:34.8917,region:"Judeia",testament:"NT",note:"Importante porto romano e cenário de episódios decisivos em Atos."},
  {id:"rome",name:"Roma",modern:"Rome",country:"Itália",lat:41.9028,lng:12.4964,region:"Itália",testament:"NT",note:"Destino final da viagem de Paulo a Roma em Atos."},
  {id:"samaria",name:"Samaria",modern:"Sebastia",country:"Palestina",lat:32.277,lng:35.19,region:"Samaria",testament:"NT",note:"Região destacada em Atos 8 na expansão do testemunho cristão."}
];

export const lesson13 = {
  title: "A Missão Continua em Nós",
  reference: "Atos 1:8",
  cities: ["jerusalem","samaria","caesarea","antioch-syria","ephesus","philippi","corinth","rome"]
};