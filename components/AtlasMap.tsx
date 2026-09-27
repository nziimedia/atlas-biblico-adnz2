"use client";

import { useEffect, useRef } from "react";
import maplibregl, { type Map as MapLibreMap } from "maplibre-gl";
import { cities } from "@/lib/cities";

export default function AtlasMap({ selectedIds }: { selectedIds: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: ref.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [28, 34],
      zoom: 4.2,
      attributionControl: true
    });
    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.on("load", () => {
      selectedIds
        .map(id => cities.find(c => c.id === id))
        .filter(Boolean)
        .forEach(city => {
          new maplibregl.Marker({ color: "#b8860b" })
            .setLngLat([city!.lng, city!.lat])
            .setPopup(new maplibregl.Popup({ offset: 18 }).setHTML(
              '<div style="min-width:220px"><strong style="font-size:16px">' +
              city!.name + '</strong><div style="margin-top:4px;color:#64748b">' +
              city!.region + ' · ' + city!.modern + '</div><p style="margin:10px 0 0">' +
              city!.note + '</p></div>'
            ))
            .addTo(map);
        });
    });
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [selectedIds]);

  return <div ref={ref} className="h-full w-full" />;
}