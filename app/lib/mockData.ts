import { SwimRoute, SwimmerData } from '../types/swim'

export const mockRoute: SwimRoute = {
  id: '1',
  name: 'Phi Phi to Phuket Charity Swim 2024',
  coordinates: [
    [7.7407, 98.7784], // Phi Phi Island
    [7.7651, 98.7594],
    [7.7895, 98.7404],
    [7.8139, 98.7214],
    [7.8383, 98.7024],
    [7.8627, 98.6834],
    [7.8871, 98.6644],
    [7.9115, 98.6454],
    [7.9359, 98.6264],
    [7.8840, 98.3967], // Phuket (Chalong Pier)
  ],
  distance: 42000, // meters
  startTime: new Date('2024-07-01T06:00:00'),
}

export const mockSwimmers: SwimmerData[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    currentPosition: [7.7895, 98.7404], // 30% along route
    lastUpdate: new Date(),
    distanceCovered: 12600
  },
  {
    id: '2',
    name: 'Michael Patel',
    currentPosition: [7.8139, 98.7214], // 35% along route
    lastUpdate: new Date(),
    distanceCovered: 14700
  },
  {
    id: '3',
    name: 'Emma Thompson',
    currentPosition: [7.7651, 98.7594], // 25% along route
    lastUpdate: new Date(),
    distanceCovered: 10500
  },
] 