import React, { useEffect, useRef } from 'react';
import './StarryBackground.css';

const StarryBackground = ({ density = 100 }) => {
  const starsRef = useRef(null);
  const shootingStarsRef = useRef(null);

  useEffect(() => {
    if (!starsRef.current || !shootingStarsRef.current) return;
    
    // Clear existing stars
    starsRef.current.innerHTML = '';
    shootingStarsRef.current.innerHTML = '';
    
    // Generate much more twinkling stars for realistic space effect
    const starTypes = ['star-tiny', 'star-small', 'star-medium', 'star-large'];
    const starTypeDistribution = [0.7, 0.2, 0.07, 0.03]; // Realistic distribution - mostly tiny stars
    const starsDensity = Math.floor(density * 4); // Much higher density
    
    for (let i = 0; i < starsDensity; i++) {
      const star = document.createElement('div');
      
      // Use weighted distribution to favor smaller stars
      const random = Math.random();
      let starTypeIndex = 0;
      let cumulativeProbability = 0;
      
      for (let j = 0; j < starTypeDistribution.length; j++) {
        cumulativeProbability += starTypeDistribution[j];
        if (random <= cumulativeProbability) {
          starTypeIndex = j;
          break;
        }
      }
      
      star.className = `star ${starTypes[starTypeIndex]}`;
      
      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Animation variables - subtle twinkling
      star.style.setProperty('--duration', `${5 + Math.random() * 10}s`); // Longer durations
      star.style.setProperty('--delay', `${Math.random() * 10}s`);
      star.style.setProperty('--max-opacity', `${0.3 + (Math.random() * 0.5 * (starTypeIndex + 1) / 4)}`); // Larger stars slightly brighter
      
      starsRef.current.appendChild(star);
    }
    
    // Generate occasional shooting stars - very rare like in real space
    const shootingStarCount = Math.floor(density / 50); // Much fewer shooting stars
    
    for (let i = 0; i < shootingStarCount; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      
      // Random position and angle - more realistic angles
      shootingStar.style.left = `${Math.random() * 100}%`;
      shootingStar.style.top = `${Math.random() * 35}%`; // Keep shooting stars higher in the sky
      
      const angle = -10 - Math.random() * 25; // More subtle angles for realistic look
      shootingStar.style.setProperty('--angle', `${angle}deg`);
      shootingStar.style.setProperty('--angle-distance', `${Math.tan(angle * Math.PI / 180)}`);
      
      // Animation variables - much longer delays between shooting stars
      shootingStar.style.setProperty('--duration', `${1 + Math.random() * 3}s`); // Faster duration - real meteors are very fast
      shootingStar.style.setProperty('--delay', `${15 + Math.random() * 45}s`); // Much longer delays between shooting stars
      
      shootingStarsRef.current.appendChild(shootingStar);
    }
    
  }, [density]);

  return (
    <div className="starry-background">
      <div ref={starsRef} className="stars"></div>
      <div ref={shootingStarsRef} className="stars"></div>
    </div>
  );
};

export default StarryBackground;
