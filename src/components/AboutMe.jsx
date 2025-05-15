import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { aboutTimeline } from "../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarryBackground from "./StarryBackground";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Styled Components
const CardContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 2rem 0;
  overflow: visible;
  
  @media (max-width: 768px) {
    min-height: 60vh;
    padding: 1rem 0;
  }
  
  @media (max-width: 480px) {
    min-height: 50vh;
  }
`;

// 3D Rotating Card Wrapper
const RotatingCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  perspective: 3000px;
  margin: 40px 0;
  min-height: 500px;
  transform: scale(0.85);
  
  @media (max-width: 1024px) {
    transform: scale(0.8);
    min-height: 450px;
  }
  
  @media (max-width: 768px) {
    transform: scale(0.7);
    min-height: 400px;
    margin: 20px 0;
  }
  
  @media (max-width: 480px) {
    transform: scale(0.6);
    min-height: 350px;
    margin: 10px 0;
  }
`;

const RotatingInner = styled.div`
  --w: 400px;
  --h: 350px;
  --translateZ: 600px;
  --rotateX: 0deg;
  --perspective: 2500px;
  --rotation-duration: 40s;
  position: relative;
  width: var(--w);
  height: var(--h);
  transform-style: preserve-3d;
  transform: perspective(var(--perspective)) rotateX(var(--rotateX));
  z-index: 5;
  
  &.auto-rotating {
    animation: autoRotate var(--rotation-duration) linear infinite;
  }
  
  @keyframes autoRotate {
    from {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(0deg);
    }
    to {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(360deg);
    }
  }
  
  @media (max-width: 1024px) {
    --w: 380px;
    --h: 330px;
    --translateZ: 550px;
  }
  
  @media (max-width: 768px) {
    --w: 340px;
    --h: 300px;
    --translateZ: 500px;
  }
  
  @media (max-width: 480px) {
    --w: 300px;
    --h: 280px;
    --translateZ: 400px;
  }
`;

const GlassCard = styled.div`
  position: absolute;
  width: 82%;
  height: 87%;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 12px;
  border: 2px solid rgba(var(--color-card, '59, 130, 246'), 0.5);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5),
              inset 0 0 30px rgba(var(--color-card, '59, 130, 246'), 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 12px 10px;
  left: 9%;
  top: 6.5%;
  transform: rotateY(calc((360deg / var(--quantity, 10)) * var(--index, 0)))
    translateZ(var(--translateZ));
  overflow: hidden;
  transform-style: preserve-3d;
  z-index: calc(10 - (var(--index, 0) % 10));
  transition: transform 0.5s ease;
  
  &:hover {
    transform: rotateY(calc((360deg / var(--quantity, 10)) * var(--index, 0)))
      translateZ(calc(var(--translateZ) + 100px));
    z-index: 20;
  }
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(var(--color-card, '59, 130, 246'), 0.25);
  border: 2px solid rgba(var(--color-card, '59, 130, 246'), 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  box-shadow: 0 0 25px rgba(var(--color-card, '59, 130, 246'), 0.5),
              inset 0 0 15px rgba(var(--color-card, '59, 130, 246'), 0.3);
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    width: 150%;
    height: 150%;
    background: radial-gradient(circle at center, rgba(var(--color-card, '59, 130, 246'), 0.8) 0%, transparent 70%);
    top: -25%;
    left: -25%;
    opacity: 0.1;
    animation: pulse 3s infinite ease-in-out;
  }
  
  span {
    font-size: 2rem;
    color: white;
    filter: drop-shadow(0 0 15px rgba(var(--color-card, '59, 130, 246'), 0.9));
  }
  
  @keyframes pulse {
    0% { transform: scale(0.8); opacity: 0.1; }
    50% { transform: scale(1.2); opacity: 0.2; }
    100% { transform: scale(0.8); opacity: 0.1; }
  }
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
  color: white;
  margin-bottom: 5px;
  text-shadow: 0 0 15px rgba(var(--color-card, '59, 130, 246'), 0.7);
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.5px;
  width: 100%;
  line-height: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.4rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 4px;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 3px;
  }
`;

const CardPeriod = styled.p`
  font-size: 0.85rem;
  color: rgba(var(--color-card, '59, 130, 246'), 1);
  margin-bottom: 8px;
  text-align: center;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(var(--color-card, '59, 130, 246'), 0.5);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 6px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-bottom: 5px;
  }
`;

const CardDescription = styled.p`
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  line-height: 1.25;
  margin-bottom: 10px;
  max-width: 95%;
  overflow-y: visible;
  padding: 0;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    line-height: 1.2;
    margin-bottom: 10px;
    max-height: 100px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    line-height: 1.2;
    margin-bottom: 8px;
    max-height: 80px;
  }
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(var(--color-card, '59, 130, 246'), 0.3);
    border-radius: 10px;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  margin-top: 8px;
  max-width: 95%;
  overflow: visible;
`;

const SkillTag = styled.span`
  padding: 2px 6px;
  background: rgba(var(--color-card, '59, 130, 246'), 0.25);
  border: 1px solid rgba(var(--color-card, '59, 130, 246'), 0.5);
  border-radius: 10px;
  color: white;
  font-size: 0.67rem;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(var(--color-card, '59, 130, 246'), 0.3);
  margin: 1px;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.7);
  border: 2px solid rgba(59, 130, 246, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
  
  svg {
    width: 30px;
    height: 30px;
    
    @media (max-width: 768px) {
      width: 24px;
      height: 24px;
    }
    
    @media (max-width: 480px) {
      width: 20px;
      height: 20px;
    }
  }
  
  &:hover {
    background: rgba(59, 130, 246, 0.3);
    box-shadow: 0 4px 25px rgba(59, 130, 246, 0.6);
    transform: translateY(-50%) scale(1.1);
  }
  
  &.prev {
    left: 50px;
    
    @media (max-width: 768px) {
      left: 20px;
    }
    
    @media (max-width: 480px) {
      left: 10px;
    }
  }
  
  &.next {
    right: 50px;
    
    @media (max-width: 768px) {
      right: 20px;
    }
    
    @media (max-width: 480px) {
      right: 10px;
    }
  }
`;

const Indicators = styled.div`
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
  z-index: 20;
  
  @media (max-width: 768px) {
    bottom: -40px;
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    bottom: -30px;
    gap: 10px;
  }
`;

const IndicatorDot = styled.button`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${props => props.active ? 'rgba(59, 130, 246, 0.9)' : 'rgba(15, 23, 42, 0.7)'};
  border: 2px solid ${props => props.active ? 'rgba(59, 130, 246, 0.9)' : 'rgba(59, 130, 246, 0.3)'};
  cursor: pointer;
  box-shadow: ${props => props.active ? '0 0 15px rgba(59, 130, 246, 0.7)' : 'none'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
    border-color: rgba(59, 130, 246, 0.6);
  }
  
  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
  
  @media (max-width: 480px) {
    width: 10px;
    height: 10px;
    border-width: 1px;
  }
`;

const DecorativeBlur = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  z-index: 1;
  opacity: 0.1;
  filter: blur(80px);
  
  &.top-left {
    top: -100px;
    left: -100px;
    background: radial-gradient(circle, rgba(59, 130, 246, 1) 0%, transparent 70%);
  }
  
  &.bottom-right {
    bottom: -100px;
    right: -100px;
    background: radial-gradient(circle, rgba(147, 51, 234, 1) 0%, transparent 70%);
  }
`;

const AboutMe = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(40); // Default 40 seconds per rotation
  const headerRef = useRef(null);
  const paragraphRef = useRef(null);
  const cardRefs = useRef([]);
  const rotatingRef = useRef(null);
  
  // Setup card refs
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, aboutTimeline.length);
  }, []);
  
  // Function to speed up rotation
  const speedUpRotation = () => {
    // Decrease rotation time (faster rotation)
    const newSpeed = Math.max(10, rotationSpeed - 10); // Minimum 10 seconds
    setRotationSpeed(newSpeed);
  };
  
  // Function to slow down rotation
  const slowDownRotation = () => {
    // Increase rotation time (slower rotation)
    const newSpeed = Math.min(60, rotationSpeed + 10); // Maximum 60 seconds
    setRotationSpeed(newSpeed);
  };
  
  // Update active index based on visible card
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate which card is currently most visible based on rotation
      const currentRotation = rotatingRef.current ? 
        (rotatingRef.current.style.animationDelay || 0) : 0;
      
      // Update the active index every second
      const nextIndex = (activeIndex + 1) % aboutTimeline.length;
      setActiveIndex(nextIndex);
    }, 5000); // Check every 5 seconds
    
    return () => clearInterval(interval);
  }, [activeIndex]);
  
  // No cleanup needed for auto-rotation
  
  // Animation for initial load
  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current.children,
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );
    
    // Paragraph animation
    gsap.fromTo(
      paragraphRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
      }
    );
    
    // Cards animation
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.set(card, { 
          opacity: 0,
          scale: 0.85,
          rotationX: 15
        });
        
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          delay: 0.5 + (index * 0.1),
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50",
            toggleActions: "play none none none",
          },
        });
      }
    });
    
    // Make sure the rotation is visible
    gsap.set('.rotating-inner', {
      transformStyle: 'preserve-3d',
      transformPerspective: 2500
    });
  }, []);
  
  return (
    <div className="overflow-hidden relative">
      <StarryBackground density={230} />
      <div ref={headerRef}>
        <p className={`${styles.sectionSubText} text-center`}>
          Introduction
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          About Me
        </h2>
      </div>

      <div className="mt-8">
        <p
          ref={paragraphRef}
          className="text-gray-300 text-[17px] max-w-3xl mx-auto leading-[30px] text-center mb-16"
        >
          I'm a developer passionate about crafting intuitive user experiences through clean code and thoughtful UI/UX design. My full-stack expertise has been sharpened through hackathon competitions, while my growing interest in machine learning drives me to solve increasingly complex problems. I'm actively seeking industry connections and opportunities to further develop my web and front-end engineering skills.
        </p>

        <CardContainer>
          {/* 3D Rotating Cards */}
          <RotatingCardWrapper>
            <RotatingInner 
              ref={rotatingRef}
              className="rotating-inner auto-rotating"
              style={{ 
                '--quantity': aboutTimeline.length,
                '--rotation-duration': `${rotationSpeed}s`
              }}
            >
              {aboutTimeline.map((card, index) => (
                <GlassCard 
                  key={index}
                  ref={el => cardRefs.current[index] = el}
                  style={{
                    '--index': index,
                    '--color-card': getCardColor(index)
                  }}
                  onClick={() => rotateToCard(index)}
                >
                  <IconContainer>
                    <span>{card.icon}</span>
                  </IconContainer>
                  
                  <CardTitle>{card.title}</CardTitle>
                  <CardPeriod>{card.period}</CardPeriod>
                  <CardDescription>{card.description}</CardDescription>
                  
                  {card.skills && (
                    <SkillsContainer>
                      {card.skills.map((skill, skillIndex) => (
                        <SkillTag key={skillIndex}>{skill}</SkillTag>
                      ))}
                    </SkillsContainer>
                  )}
                </GlassCard>
              ))}
            </RotatingInner>
          </RotatingCardWrapper>
          
          {/* Speed Control Buttons */}
          <NavButton className="prev" onClick={slowDownRotation} title="Slow down rotation">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </NavButton>
          
          <NavButton className="next" onClick={speedUpRotation} title="Speed up rotation">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </NavButton>
          
          {/* Indicator Dots */}
          <Indicators>
            {aboutTimeline.map((_, index) => (
              <IndicatorDot 
                key={index} 
                active={index === activeIndex} 
              />
            ))}
          </Indicators>
          
          {/* Decorative Elements */}
          <DecorativeBlur className="top-left" />
          <DecorativeBlur className="bottom-right" />
        </CardContainer>
      </div>
    </div>
  );
};

// Helper function to get different colors for each card
const getCardColor = (index) => {
  const colors = [
    '99, 179, 237',   // Blue
    '129, 140, 248',  // Indigo
    '160, 110, 245',  // Purple
    '213, 90, 235',   // Pink
    '246, 109, 155',  // Rose
    '252, 129, 97',   // Orange
    '250, 176, 5',    // Amber
    '163, 230, 53',   // Lime
    '52, 211, 153',   // Emerald
    '6, 182, 212'     // Cyan
  ];
  
  // Make the active card's color more vibrant
  return colors[index % colors.length];
};

export default SectionWrapper(AboutMe, "about");
