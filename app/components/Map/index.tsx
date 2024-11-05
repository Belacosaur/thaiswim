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
  const infoControlRef = useRef<L.Control | null>(null)

  const updateInfoContent = (content: string) => {
    if (infoControlRef.current) {
      const container = infoControlRef.current.getContainer()
      if (container) {
        container.innerHTML = content
      }
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([7.8383, 98.6834], 11)
      mapInstanceRef.current = map

      // Create custom control
      const InfoControl = L.Control.extend({
        onAdd: function() {
          const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control swimmer-info bg-white/90 p-4 rounded-lg shadow-lg w-80')
          container.innerHTML = `
            <h3 class="text-gray-800 font-bold mb-2">Phi Phi to Phuket Swim</h3>
            <p class="text-gray-600">Click a swimmer to see their progress</p>
          `
          return container
        }
      })

      infoControlRef.current = new InfoControl({ position: 'topright' })
      infoControlRef.current.addTo(map)

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
          
          updateInfoContent(`
            <div class="text-gray-800">
              <h3 class="font-bold text-lg mb-2">${swimmer.name}</h3>
              <div class="space-y-2">
                <p>Distance: ${(swimmer.distanceCovered / 1000).toFixed(1)}km</p>
                <p>Progress: ${((swimmer.distanceCovered / mockRoute.distance) * 100).toFixed(1)}%</p>
                <p class="text-sm">Last Update: ${swimmer.lastUpdate.toLocaleTimeString()}</p>
              </div>
            </div>
          `)
        })
      })

      // Reset info control on map click
      map.on('click', () => {
        onMarkerClick(null)
        updateInfoContent(`
          <h3 class="text-gray-800 font-bold mb-2">Phi Phi to Phuket Swim</h3>
          <p class="text-gray-600">Click a swimmer to see their progress</p>
        `)
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