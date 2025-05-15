// Canvas performance optimization helpers
export const defaultCanvasProps = {
  frameloop: 'always',
  gl: { 
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  },
  dpr: [1, 1.5] // Limit device pixel ratio range for better performance
};

// Configure OrbitControls for different device capabilities
export const getOrbitControlProps = (isMobile) => ({
  autoRotate: true,
  autoRotateSpeed: isMobile ? 0.3 : 0.5, // Slower rotation on mobile
  enableZoom: false,
  enablePan: false,
  maxPolarAngle: Math.PI / 1.8,
  minPolarAngle: Math.PI / 2.5,
  rotateSpeed: 0.5
});
