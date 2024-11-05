# Thai Swim Tracker

An interactive map application to track swimmers' progress during the Phi Phi to Phuket charity swim event, deployed at [thaiswim.vercel.app](https://thaiswim.vercel.app)

## Features

- Real-time swimmer location tracking
- Interactive map with route visualization
- Detailed swimmer progress information
- Responsive design for all devices
- Start/finish point markers
- Progress percentage calculation

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [Leaflet](https://leafletjs.com/) - Interactive maps
- [TypeScript](https://www.typescriptlang.org/) - Type safety (88.7%)
- [Tailwind CSS](https://tailwindcss.com/) - Styling (10.1%)

## Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Belacosaur/thaiswim.git
cd thaiswim
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
thaiswim/
├── app/
│   ├── components/
│   │   ├── Map/           # Map component with Leaflet integration
│   │   └── SwimmerPanel/  # Swimmer information panel
│   ├── lib/
│   │   └── mockData.ts    # Sample swimmer and route data
│   ├── types/
│   │   └── swim.ts        # TypeScript interfaces
│   └── page.tsx           # Main application page
├── public/
│   ├── globe.svg
│   ├── file.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── ...
```

## Leaflet Integration

This project uses Leaflet for map functionality. Key features include:

- Custom markers for swimmers and start point
- Polyline for route visualization
- Custom info control for swimmer details
- Interactive click events for markers

### Leaflet Resources
- [Leaflet Documentation](https://leafletjs.com/reference.html)
- [React-Leaflet](https://react-leaflet.js.org/)
- [OpenStreetMap](https://www.openstreetmap.org/)

## Building for Production

```bash
npm run build
npm start
```

The easiest way to deploy is using the [Vercel Platform](https://vercel.com) from the creators of Next.js.

## Acknowledgments

Belacosaur