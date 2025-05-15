import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Box, Cylinder } from "@react-three/drei";

import CanvasLoader from "../Loader";

const SimpleComputer = ({ isMobile }) => {
  const computerRef = useRef();
  const monitorRef = useRef();
  const screenRef = useRef();
  
  // Animation
  useFrame(({ clock }) => {
    if (computerRef.current) {
      computerRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = 0.5 + Math.sin(clock.getElapsedTime() * 2) * 0.2;
    }
  });

  const scale = isMobile ? 0.7 : 0.9;
  
  return (
    <group ref={computerRef} position={[0, -0.5, 0]} scale={scale}>
      {/* Base/Tower */}
      <Box args={[1, 3, 1.2]} position={[-1.2, -0.5, 0]}>
        <meshStandardMaterial color="#303030" metalness={0.5} roughness={0.2} />
      </Box>
      
      {/* Monitor Stand */}
      <Cylinder args={[0.3, 0.5, 0.2, 16]} position={[0, -1.5, 0]}>
        <meshStandardMaterial color="#252525" metalness={0.7} roughness={0.2} />
      </Cylinder>
      
      <Box args={[0.15, 1, 0.15]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#404040" metalness={0.6} roughness={0.3} />
      </Box>
      
      {/* Monitor */}
      <group ref={monitorRef}>
        {/* Monitor frame */}
        <Box args={[3, 1.8, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.2} />
        </Box>
        
        {/* Screen */}
        <Box ref={screenRef} args={[2.7, 1.5, 0.05]} position={[0, 0, 0.06]}>
          <meshStandardMaterial 
            color="#915eff" 
            emissive="#915eff" 
            emissiveIntensity={0.6}
          />
        </Box>
      </group>
      
      {/* Keyboard */}
      <Box args={[2, 0.1, 0.8]} position={[0, -1.8, 0.8]}>
        <meshStandardMaterial color="#252525" metalness={0.4} roughness={0.4} />
      </Box>
      
      {/* Mouse */}
      <Box args={[0.3, 0.1, 0.5]} position={[1.2, -1.8, 0.8]} rotation={[0, 0.3, 0]}>
        <meshStandardMaterial color="#303030" metalness={0.4} roughness={0.4} />
      </Box>
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='always'
      camera={{ position: [0, 0, 8], fov: 25 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#915eff" />
      
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.2}
        />
        <SimpleComputer isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
};

export default ComputersCanvas;
