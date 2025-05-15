import React, { useRef, useEffect, useState } from "react";
import "./SimpleInfiniteScroll.css";

const SimpleInfiniteScroll = ({
  items = [],
  maxHeight = "700px",
  isTilted = true,
  tiltDirection = "left",
  autoplay = true,
  autoplaySpeed = 0.15,
  pauseOnHover = true
}) => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef(null);
  
  // Set up auto-scrolling with highly optimized animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    // Use transform for smoother animation instead of scrollTop
    const contentWrapper = scrollRef.current.querySelector('.scroll-content');
    if (!contentWrapper) return;
    
    // Get the height of one set of items for resetting
    const gridElement = contentWrapper.querySelector('.project-grid');
    const singleHeight = gridElement ? gridElement.clientHeight / 2 : 0;
    
    let position = 0;
    let lastTimestamp = 0;
    
    const animate = (timestamp) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }
      
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      
      if (!isPaused && autoplay) {
        // Calculate movement with reduced multiplier for smoother, slower animation
        position -= autoplaySpeed * elapsed * 0.05; // Slower, more comfortable scrolling speed
        
        // Reset position when we've scrolled a full height to create infinite effect
        if (Math.abs(position) >= singleHeight) {
          position = 0;
        }
        
        // Use transform for smooth GPU-accelerated animation
        contentWrapper.style.transform = `translateY(${position}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, autoplay, autoplaySpeed]);
  
  // Track if the user is manually scrolling
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const manualScrollTimeout = useRef(null);

  // Handle pause on hover with minimal visual feedback
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
      // Add a subtle hover state indicator
      if (scrollRef.current) {
        scrollRef.current.classList.add('hover-active');
      }
    }
  };
  
  const handleMouseLeave = () => {
    // Always resume scrolling when mouse leaves, regardless of manual scrolling state
    if (pauseOnHover) {
      setIsPaused(false);
      setIsManualScrolling(false); // Reset manual scrolling flag
      // Remove the hover indicator
      if (scrollRef.current) {
        scrollRef.current.classList.remove('hover-active');
      }
    }
  };
  
  // Enhanced manual scrolling with wheel event
  const handleWheel = (e) => {
    // When user scrolls manually with the wheel, temporarily pause autoplay
    setIsPaused(true);
    setIsManualScrolling(true);
    
    // Clear any existing timeout
    if (manualScrollTimeout.current) {
      clearTimeout(manualScrollTimeout.current);
    }
    
    // Resume autoplay after a shorter delay - make it more responsive
    manualScrollTimeout.current = setTimeout(() => {
      // Always resume scrolling after the timeout unless still hovering
      if (pauseOnHover && scrollRef.current?.matches(':hover')) {
        // Keep paused but reset manual scrolling flag
        setIsManualScrolling(false);
        return;
      }
      
      // Otherwise resume completely
      setIsManualScrolling(false);
      setIsPaused(false);
    }, 800); // Shorter timeout for better responsiveness
  };
  
  // Handle touch scrolling for mobile devices
  const handleScroll = () => {
    // Only respond if not already handling wheel events
    if (!isManualScrolling) {
      setIsPaused(true);
      setIsManualScrolling(true);
      
      // Similar timeout logic to handleWheel
      if (manualScrollTimeout.current) {
        clearTimeout(manualScrollTimeout.current);
      }
      
      manualScrollTimeout.current = setTimeout(() => {
        // Always resume scrolling after the timeout unless still touching
        if (pauseOnHover && scrollRef.current?.matches(':hover')) {
          // Keep paused but reset manual scrolling flag
          setIsManualScrolling(false);
          return;
        }
        
        // Otherwise resume completely
        setIsManualScrolling(false);
        setIsPaused(false);
      }, 800); // Match the wheel handler timeout
    }
  };
  
  return (
    <div 
      className={`simple-infinite-scroll ${isTilted ? `tilted-${tiltDirection}` : ''}`}
    >
      <div className="scroll-container-wrapper">
        <div 
          className="scroll-container"
          ref={scrollRef}
          style={{ maxHeight }}
          onScroll={handleScroll}
          onWheel={handleWheel}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="scroll-content">
            {/* Display project cards in a grid-like layout */}
            <div className="project-grid">
              {/* Render items twice to create the infinite scroll effect */}
              {items}
              {items}
            </div>
          </div>
        </div>
      </div>
      {/* No fade effects or scroll indicators */}
    </div>
  );
};

export default SimpleInfiniteScroll;
