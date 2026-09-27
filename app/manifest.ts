import type {MetadataRoute} from "next";

export default function manifest():MetadataRoute.Manifest{
 return {
  name:"Atlas Bíblico AD Nazaré II",
  short_name:"Atlas Bíblico",
  description:"Atlas bíblico interativo para EBD e projeção.",
  start_url:"/atlas",
  display:"standalone",
  background_color:"#07111f",
  theme_color:"#07111f",
  lang:"pt-BR",
  icons:[{src:"/icon.svg",sizes:"any",type:"image/svg+xml",purpose:"any maskable"}]
 };
}
