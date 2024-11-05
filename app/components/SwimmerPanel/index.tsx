import { SwimmerData } from '@/app/types/swim'
import { mockRoute } from '@/app/lib/mockData'

interface SwimmerPanelProps {
  swimmer: SwimmerData | null
}

export default function SwimmerPanel({ swimmer }: SwimmerPanelProps) {
  if (!swimmer) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Phi Phi to Phuket Charity Swim</h2>
        <div className="space-y-2">
          <p>Total Distance: {(mockRoute.distance / 1000).toFixed(1)}km</p>
          <p>Start Time: {mockRoute.startTime.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Click on a swimmer to see their progress</p>
        </div>
      </div>
    )
  }

  const progress = (swimmer.distanceCovered / mockRoute.distance) * 100
  const remainingDistance = mockRoute.distance - swimmer.distanceCovered
  const estimatedTimeRemaining = (remainingDistance / 2000) * 60 // Assuming 2km/h swim speed

  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-4">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">{swimmer.name}</h2>
        <p className="text-sm text-gray-600">Last Updated: {swimmer.lastUpdate.toLocaleTimeString()}</p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-1">Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">{progress.toFixed(1)}% Complete</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Distance Covered</h3>
            <p>{(swimmer.distanceCovered / 1000).toFixed(1)}km</p>
          </div>
          <div>
            <h3 className="font-semibold">Remaining</h3>
            <p>{(remainingDistance / 1000).toFixed(1)}km</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Estimated Time Remaining</h3>
          <p>{Math.floor(estimatedTimeRemaining / 60)}h {Math.round(estimatedTimeRemaining % 60)}m</p>
        </div>

        <div>
          <h3 className="font-semibold">Current Position</h3>
          <p className="text-sm">
            Lat: {swimmer.currentPosition[0].toFixed(4)}°<br />
            Long: {swimmer.currentPosition[1].toFixed(4)}°
          </p>
        </div>
      </div>
    </div>
  )
} 