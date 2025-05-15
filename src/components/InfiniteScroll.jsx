import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import "./InfiniteScroll.css";

// Register GSAP plugins
gsap.registerPlugin(Observer);

// Reduce GSAP's internal tick rate for better performance
gsap.ticker.fps(30);

const InfiniteScroll = ({
  width = "100%",
  maxHeight = "500px",
  items = [],
  itemMinHeight = 200,
  isTilted = false,
  tiltDirection = "left",
  autoplay = false,
  autoplaySpeed = 0.5,
  autoplayDirection = "down",
  pauseOnHover = true,
  negativeMargin = "-1em",
}) => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = React.useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (items.length === 0) return;

    // Get all items inside the container
    const divItems = gsap.utils.toArray(container.querySelectorAll('.infinite-scroll-item'));
    if (!divItems.length) return;

    // Calculate dimensions for proper scrolling
    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem);
    const itemHeight = firstItem.offsetHeight;
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;
    const itemMarginBottom = parseFloat(itemStyle.marginBottom) || 0;
    const totalItemHeight = itemHeight + itemMarginTop + itemMarginBottom;
    const totalHeight = (totalItemHeight * items.length);

    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);

    divItems.forEach((child, i) => {
      const y = i * totalItemHeight;
      gsap.set(child, { y });
    });

    // Debounce function to prevent too many animations firing at once
    const debounce = (func, wait = 10) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    // Create a single timeline for animations
    const scrollTl = gsap.timeline({ paused: true });
    
    // Handle scroll with debouncing to prevent glitching
    const handleScroll = debounce(({ deltaY, isDragging, event }) => {
      const d = event.type === "wheel" ? -deltaY : deltaY;
      const distance = isDragging ? d * 2 : d * 4;
      
      // Update positions directly with GSAP set instead of animations for smoother scrolling
      divItems.forEach((child) => {
        const currentY = parseFloat(gsap.getProperty(child, "y") || 0);
        const newY = wrapFn(currentY + distance);
        gsap.set(child, { y: newY });
      });
    }, 5); // 5ms debounce
    
    const observer = Observer.create({
      target: container,
      type: "wheel,touch,pointer",
      preventDefault: true,
      wheelSpeed: 0.3, // Further reduce wheel speed
      tolerance: 10, // Increase drag tolerance
      onPress: ({ target }) => {
        // Temporarily pause autoplay when user is interacting
        setIsPaused(true);
        target.style.cursor = "grabbing";
      },
      onRelease: ({ target }) => {
        // Resume autoplay if we're not in a paused state from hover
        if (!pauseOnHover || (pauseOnHover && !target.matches(':hover'))) {
          setIsPaused(false);
        }
        target.style.cursor = "grab";
      },
      onChange: handleScroll
    });

    // Handle autoplay with requestAnimationFrame for smoother animation
    let rafId;
    if (autoplay) {
      const directionFactor = autoplayDirection === "down" ? 1 : -1;
      const speed = autoplaySpeed * directionFactor;
      
      // Use requestAnimationFrame for smoother animation
      const animate = () => {
        if (isPaused) {
          rafId = requestAnimationFrame(animate);
          return;
        }
        
        // Update positions directly with GSAP set for better performance
        divItems.forEach((child) => {
          const currentY = parseFloat(gsap.getProperty(child, "y") || 0);
          const newY = wrapFn(currentY + speed);
          gsap.set(child, { y: newY });
        });
        
        rafId = requestAnimationFrame(animate);
      };
      
      // Start animation
      rafId = requestAnimationFrame(animate);
      
      if (pauseOnHover) {
        const handleMouseEnter = () => setIsPaused(true);
        const handleMouseLeave = () => setIsPaused(false);
        
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);
        
        return () => {
          observer.kill();
          cancelAnimationFrame(rafId);
          container.removeEventListener("mouseenter", handleMouseEnter);
          container.removeEventListener("mouseleave", handleMouseLeave);
        };
      } else {
        return () => {
          observer.kill();
          cancelAnimationFrame(rafId);
        };
      }
    }

    return () => {
      observer.kill();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    items,
    itemMinHeight,
    autoplay,
    autoplaySpeed,
    autoplayDirection,
    pauseOnHover,
  ]);

  return (
    <div
      className={`infinite-scroll-container ${isTilted ? `tilted-${tiltDirection}` : ""}`}
      style={{ width, maxHeight }}
      ref={containerRef}
    >
      <div className="infinite-scroll-fade-top" />
      <div className="infinite-scroll-items" style={{ marginTop: negativeMargin }}>
        {items.map((item, index) => (
          <div key={index} className="infinite-scroll-item">
            {item}
          </div>
        ))}
      </div>
      <div className="infinite-scroll-fade-bottom" />
    </div>
  );
};

export default InfiniteScroll;
