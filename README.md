# Adrish's 3D Portfolio

An interactive 3D portfolio website built with React and Three.js. This project features a modern, responsive design with a 3D book interface, interactive 3D Earth model, and dynamic components showcasing projects, skills, and experience.

## Tech Stack

### Core
- **React** - Front-end library for building the user interface
- **Three.js** - 3D graphics library for creating and rendering 3D models
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **Vite** - Next generation frontend tooling for fast development and optimized builds

### Styling & Animation
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion** - Animation library for React
- **GSAP** - Professional-grade animation library
- **Styled Components** - CSS-in-JS styling solution

### State Management & UI
- **Jotai** - Primitive and flexible state management for React
- **React Icons** - Icon library for React
- **Leva** - Debug GUI for React Three Fiber

### Communication
- **EmailJS** - Client-side email sending service for contact form

### 3D/Math Libraries
- **Maath** - Math helpers for 3D animations
- **Three-stdlib** - Three.js standard library
- **GL-Matrix** - Matrix and vector operations library
- **OGL** - WebGL framework

## Features

- **Interactive 3D Book** - Animated 3D book interface with page-turning animations
- **3D Earth Model** - Realistic Earth model with proper textures, atmospheric effects, and animations
- **Dynamic Project Gallery** - Showcases projects with:  
  - Rectangular, space-efficient card design
  - Dark theme with subtle gradients and rounded corners
  - Horizontal card layout with project image on the left and content on the right
- **Infinite Scroll Components** - Smooth scrolling interface for various content sections
- **Particle Effects System**:
  - Dynamic movement patterns
  - Custom textures and effects
  - Adaptive boundaries
  - Additive blending for enhanced visuals
- **Interactive Navbar** - Smooth scrolling navigation
- **Audio Integration** - Background music player
- **Responsive Design** - Mobile and desktop-friendly interface
- **Contact Form** - Email integration for visitor messages
- **Circular Gallery** - Interactive display of skills and technologies
- **Starry Background** - Animated space-themed backgrounds
- **Vertical Timeline** - Visual representation of experience and education

## Development

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/adrish-portfolio.git

# Navigate to the project directory
cd adrish-portfolio

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
    - `AboutMe.jsx` - About me section
    - `Book.jsx` - 3D book component
    - `CircularGallery.jsx` - Interactive skills gallery
    - `Contact.jsx` - Contact form with 3D Earth model
    - `Experience.jsx` - Main 3D scene setup
    - `Hero.jsx` - Hero section
    - `InfiniteScroll.jsx` - Custom infinite scrolling component
    - `MusicPlayer.jsx` - Audio controls
    - `Navbar.jsx` - Navigation bar
    - `Particles.jsx` - Background particle effects
    - `Portfolio.jsx` - Main portfolio container
    - `ProjectCard.jsx` - Custom project card component
    - `Projects.jsx` - Projects showcase section
    - `ScholasticRecord.jsx` - Education history section
    - `StarryBackground.jsx` - Animated space background
    - `Tech.jsx` - Technologies and skills section
    - `UI.jsx` - User interface elements
    - `/canvas` - 3D models and scene components
  - `/assets` - Static assets
  - `/constants` - Configuration and constants
  - `/hoc` - Higher-order components
  - `/hooks` - Custom React hooks
  - `/utils` - Utility functions
- `/public` - Static files
  - Images and other assets

## Latest Version

Current Version: 1.0.0

## License

This project is private and not intended for redistribution.

