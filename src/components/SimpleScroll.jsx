import React, { useRef, useEffect, useState } from "react";
import "./SimpleScroll.css";

const SimpleScroll = ({ items, maxHeight = "700px" }) => {
  const scrollContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef(null);
  
  // Set up auto-scrolling
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    let scrollAmount = 0;
    let scrollDirection = 1;
    let animationFrameId = null;
    
    const scroll = () => {
      if (isScrolling) {
        // Pause auto-scrolling when user is manually scrolling
        animationFrameId = requestAnimationFrame(scroll);
        return;
      }
      
      scrollAmount += 0.5;
      container.scrollTop += scrollDirection;
      
      // Reset scroll position when reaching the end to create infinite loop effect
      if (container.scrollTop >= (container.scrollHeight - container.clientHeight - 10)) {
        container.scrollTop = 0;
      }
      
      animationFrameId = requestAnimationFrame(scroll);
    };
    
    animationFrameId = requestAnimationFrame(scroll);
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isScrolling]);
  
  // Handle manual scrolling
  const handleScroll = () => {
    setIsScrolling(true);
    
    // Reset the timer
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    
    // Set a timer to stop detecting manual scrolling after a delay
    scrollTimerRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };
  
  return (
    <div className="simple-scroll-container">
      <div 
        className="simple-scroll-content"
        ref={scrollContainerRef}
        onScroll={handleScroll}
        style={{ maxHeight }}
      >
        <div className="simple-scroll-items">
          {items}
          {/* Duplicate items to create infinite scroll effect */}
          {items}
        </div>
      </div>
      <div className="simple-scroll-fade-top" />
      <div className="simple-scroll-fade-bottom" />
    </div>
  );
};

export default SimpleScroll;
