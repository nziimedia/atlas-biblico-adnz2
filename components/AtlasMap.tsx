"use client";

import { useEffect, useRef } from "react";
import maplibregl, { type Map as MapLibreMap, type Marker } from "maplibre-gl";
import { places, routes } from "@/lib/atlas-data";

type FocusDetail={slug:string};
type RouteDetail={routeId:string|null};

export default function AtlasMap({ selectedIds }: { selectedIds: string[] }) {
  const ref=useRef<HTMLDivElement>(null);
  const mapRef=useRef<MapLibreMap|null>(null);
  const markersRef=useRef<Record<string,Marker>>({});

  useEffect(()=>{
    if(!ref.current||mapRef.current)return;
    const map=new maplibregl.Map({container:ref.current,style:"https://tiles.openfreemap.org/styles/liberty",center:[28,34],zoom:4.2,attributionControl:true});
    map.addControl(new maplibregl.NavigationControl(),"top-right");

    map.on("load",()=>{
      const visible=places.filter(p=>selectedIds.includes(p.slug));
      visible.forEach(city=>{
        const marker=new maplibregl.Marker({color:"#d6a84a"})
          .setLngLat([city.lng,city.lat])
          .setPopup(new maplibregl.Popup({offset:18,maxWidth:"310px"}).setHTML(
            '<div style="min-width:230px;padding:4px 2px"><strong style="font-size:17px">'+city.name+
            '</strong><div style="margin-top:5px;color:#64748b">'+city.region+" · "+city.modern+
            '</div><p style="margin:10px 0 0;line-height:1.45">'+city.description+"</p></div>"
          )).addTo(map);
        markersRef.current[city.slug]=marker;
      });

      map.addSource("atlas-route",{type:"geojson",data:{type:"FeatureCollection",features:[]}});
      map.addLayer({id:"atlas-route-line",type:"line",source:"atlas-route",paint:{"line-color":"#d6a84a","line-width":4,"line-opacity":0.9,"line-dasharray":[1.2,1.2]}});
      map.addLayer({id:"atlas-route-glow",type:"line",source:"atlas-route",paint:{"line-color":"#f3d58a","line-width":9,"line-opacity":0.16}});
    });

    const focus=(event:Event)=>{
      const slug=(event as CustomEvent<FocusDetail>).detail?.slug;
      const city=places.find(p=>p.slug===slug);
      if(!city)return;
      map.flyTo({center:[city.lng,city.lat],zoom:6.2,duration:1100});
      markersRef.current[slug]?.togglePopup();
    };

    const showRoute=(event:Event)=>{
      const routeId=(event as CustomEvent<RouteDetail>).detail?.routeId;
      const route=routes.find(r=>r.id===routeId);
      const source=map.getSource("atlas-route") as maplibregl.GeoJSONSource|undefined;
      if(!source)return;
      if(!route){source.setData({type:"FeatureCollection",features:[]});return;}
      const coords=route.places.map(slug=>places.find(p=>p.slug===slug)).filter(Boolean).map(p=>[p!.lng,p!.lat]);
      source.setData({type:"FeatureCollection",features:[{type:"Feature",properties:{},geometry:{type:"LineString",coordinates:coords}}]});
      if(coords.length>1)map.fitBounds(coords as [number,number][],{padding:100,maxZoom:5.8,duration:1100});
    };

    window.addEventListener("atlas:focus",focus);
    window.addEventListener("atlas:route",showRoute);
    mapRef.current=map;
    return()=>{window.removeEventListener("atlas:focus",focus);window.removeEventListener("atlas:route",showRoute);map.remove();mapRef.current=null;markersRef.current={};};
  },[selectedIds]);

  return <div ref={ref} className="h-full w-full"/>;
}
