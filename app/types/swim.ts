export interface SwimRoute {
  id: string
  name: string
  coordinates: [number, number][]
  distance: number
  startTime: Date
  endTime?: Date
}

export interface SwimmerData {
  id: string
  name: string
  currentPosition: [number, number]
  lastUpdate: Date
  distanceCovered: number
} 