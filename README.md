# Animated Memory Book

A 3D interactive memory book built with React and Three.js. This project features an animated book interface that allows users to flip through pages of photographs with smooth animations and transitions, complete with ambient music and page-turning sound effects.

## Tech Stack

- **React** - Front-end library for building the user interface
- **Three.js** - 3D graphics library used to render the book
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Jotai** - Primitive and flexible state management for React
- **Vite** - Next generation frontend tooling
- **Maath** - Math helpers for 3D animations
- **Three-stdlib** - Three.js standard library
- **Leva** - Debug GUI for React Three Fiber

## Features

- Interactive 3D book with realistic page-turning animations
- Photo gallery presentation with a sleek UI
- Audio integration:
  - Page-flip sound effects
  - Background music player
- Animated text display for special messages
- Particle effects system
- Custom environment lighting and shadows
- Responsive and mobile-friendly design
- Smooth transitions and animations
- Touch-friendly controls

## Development

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to the project directory
cd animated-proposal-book

# Install dependencies
npm install
# or
yarn
```

### Running the Development Server

```bash
# Start the development server
npm run dev
# or
yarn dev
```

### Building for Production

```bash
# Build the application
npm run build
# or
yarn build

# Preview the production build
npm run preview
# or
yarn preview
```

## Project Structure

- `/src` - Source code
  - `/components` - React components
    - `Book.jsx` - 3D book component
    - `Experience.jsx` - Main 3D scene setup
    - `MusicPlayer.jsx` - Audio controls
    - `Particles.jsx` - Background particle effects
    - `UI.jsx` - User interface elements
  - `/assets` - Static assets
- `/public` - Static files
  - `/audios` - Sound effects and music
  - `/images` - Images and logos
  - `/textures` - Book textures and photographs

## Assets Required

- Photos for book pages (JPG format)
- Book cover and back textures
- Audio files:
  - Page flip sound effect
  - Background music
- Background images and textures

## Latest Version

Current Version: 1.0.0

## License

This project is private and not intended for redistribution.
