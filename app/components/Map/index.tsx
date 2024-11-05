import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { mockRoute, mockSwimmers } from '@/app/lib/mockData'
import { SwimmerData } from '@/app/types/swim'

interface SwimMapProps {
  onMarkerClick: (data: SwimmerData | null) => void;
}

export default function SwimMap({ onMarkerClick }: SwimMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([7.8383, 98.6834], 11)
      mapInstanceRef.current = map

      map.on('click', () => {
        onMarkerClick(null) // Clear selection when clicking map
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

      // Route line
      L.polyline(mockRoute.coordinates, { 
        color: '#0ea5e9',
        weight: 4,
        opacity: 0.7,
      }).addTo(map)

      // Start marker
      const startIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })

      L.marker(mockRoute.coordinates[0], { icon: startIcon })
        .bindPopup(`
          <div class="font-bold">Start: Koh Phi Phi</div>
          <div>Total Distance: ${(mockRoute.distance / 1000).toFixed(1)}km</div>
          <div>Start Time: ${mockRoute.startTime.toLocaleString()}</div>
        `)
        .addTo(map)

      // Swimmers
      mockSwimmers.forEach(swimmer => {
        const swimmerIcon = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })

        const marker = L.marker(swimmer.currentPosition, { icon: swimmerIcon })
          .addTo(map)
          
        marker.on('click', (e) => {
          e.originalEvent.stopPropagation()
          onMarkerClick(swimmer)
        })
      })
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [onMarkerClick])

  return <div ref={mapRef} className="w-full h-full" />
}