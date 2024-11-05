'use client'

import { useState } from 'react'
import SwimMap from './components/Map'
import { SwimmerData } from './types/swim'

export default function Home() {
  const [selectedSwimmer, setSelectedSwimmer] = useState<SwimmerData | null>(null)

  return (
    <main className="min-h-screen p-4 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Phi Phi to Phuket Charity Swim</h1>
        <div className="h-[80vh] rounded-lg overflow-hidden shadow-lg bg-white">
          <SwimMap onMarkerClick={setSelectedSwimmer} />
        </div>
        {selectedSwimmer && (
          <div>
            Selected swimmer: {selectedSwimmer.name}
          </div>
        )}
      </div>
    </main>
  )
}