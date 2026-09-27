import {NextResponse} from "next/server";
import {createClient} from "@supabase/supabase-js";
import {places as fallbackPlaces,routes as fallbackRoutes,lesson13 as fallbackLesson} from "@/lib/atlas-data";

export async function GET(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
 const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key)return NextResponse.json({places:fallbackPlaces,routes:fallbackRoutes,lesson:fallbackLesson,source:"fallback"});
 const supabase=createClient(url,key,{auth:{persistSession:false}});
 const [cities,lessons,routes]=await Promise.all([
  supabase.from("cities").select("slug,biblical_name,modern_name,country,region,latitude,longitude,description").order("biblical_name"),
  supabase.from("lessons").select("lesson_number,title,golden_text,biblical_reading,extracted_places,source_url").eq("lesson_number",13).maybeSingle(),
  supabase.from("routes").select("slug,name,description,route_type,path").order("name")
 ]);
 if(cities.error)return NextResponse.json({places:fallbackPlaces,routes:fallbackRoutes,lesson:fallbackLesson,source:"fallback",error:cities.error.message});
 const mappedPlaces=cities.data?.map(c=>({slug:c.slug,name:c.biblical_name,modern:c.modern_name??"",region:c.region??"",country:c.country??"",lat:c.latitude,lng:c.longitude,description:c.description??""}))??[];
 const dbLesson=lessons.data;
 const mappedRoutes=routes.data?.map(r=>({id:r.slug,title:r.name,subtitle:(r.path??[]).join(" → "),places:r.path??[],kind:r.route_type==="missionary"?"missionary":"expansion",note:r.description??""}))??[];
 return NextResponse.json({places:mappedPlaces.length?mappedPlaces:fallbackPlaces,routes:mappedRoutes.length?mappedRoutes:fallbackRoutes,lesson:dbLesson?{number:dbLesson.lesson_number,title:dbLesson.title,reference:dbLesson.golden_text??"",reading:dbLesson.biblical_reading??"",places:dbLesson.extracted_places??[],routes:mappedRoutes.map(r=>r.id),sourceUrl:dbLesson.source_url}:fallbackLesson,source:"supabase"});
}
