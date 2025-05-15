import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import "react-vertical-timeline-component/style.min.css";
import "./ScholasticRecord.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, timelineElementVariant } from "../utils/motion";
import StarryBackground from "./StarryBackground";

const ExperienceCard = ({ experience, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      controls.start("show");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <div ref={ref}>
      <motion.div
        variants={timelineElementVariant(index * 0.15, index % 2 === 0 ? "right" : "left")}
        initial="hidden"
        animate={controls}
      >
        <VerticalTimelineElement
          className={index % 2 === 0 ? 'right-card' : 'left-card'}
          contentStyle={{
            background: "rgba(23, 23, 54, 0.8)",
            color: "#fff",
            backdropFilter: "blur(10px)",
            boxShadow: "0 0 25px rgba(59, 130, 246, 0.3)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            transition: "all 0.3s ease-out",
            margin: index % 2 === 0 ? '0 0 0 40px' : '0 40px 0 0',
          }}
          contentArrowStyle={{ 
            borderRight: index % 2 === 0 ? "7px solid rgba(23, 23, 54, 0.8)" : 'none',
            borderLeft: index % 2 === 0 ? 'none' : "7px solid rgba(23, 23, 54, 0.8)",
            right: index % 2 === 0 ? 'auto' : '-7px',
            left: index % 2 === 0 ? '-7px' : 'auto',
            transition: "all 0.3s ease-out"
          }}
          position={index % 2 === 0 ? 'right' : 'left'}
          date={experience.date}
          iconStyle={{ 
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(17, 24, 39, 0.95) 70%)`,
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5), inset 0 0 10px rgba(59, 130, 246, 0.3)",
            transition: "all 0.3s ease-out",
            borderRadius: '50%',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            width: '60px',
            height: '60px'
          }}
          icon={
            <motion.div 
              className='flex justify-center items-center w-full h-full bg-gradient-to-b from-slate-800/80 to-slate-900/90 rounded-full border-2 border-blue-500/30'
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <div className="relative w-[85%] h-[85%] flex items-center justify-center overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-full"></div>
                <img
                  src={experience.icon}
                  alt={experience.company_name}
                  className='relative z-10 w-[95%] h-[95%] object-contain p-1'
                  style={{ filter: 'brightness(1.2) contrast(1.15) drop-shadow(0 0 4px rgba(59, 130, 246, 0.6))' }}
                />
              </div>
            </motion.div>
          }
        >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-blue-300 text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-gray-300 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
            </VerticalTimelineElement>
      </motion.div>
    </div>
  );
};

const ScholasticRecord = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const controls = useAnimation();
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);
  
  // When scrolling back up, we want all items to be visible immediately
  // rather than staggered loading again
  useEffect(() => {
    if (inView) {
      controls.start("show");
      
      if (!hasAnimatedOnce) {
        // Only do the staggered load the first time
        setHasAnimatedOnce(true);
      }
    } else {
      // Reset state when scrolling away
      controls.start("hidden");
    }
  }, [controls, inView, hasAnimatedOnce]);

  return (
    <>
      <div ref={ref} className="relative">
        <StarryBackground density={200} />
        <motion.div 
          variants={textVariant()}
          initial="hidden"
          animate={controls}
        >
          <p className={`${styles.sectionSubText} text-center`}>
            My Educational Journey
          </p>
          <h2 className={`${styles.sectionHeadText} text-center`}>
            Scholastic Record
          </h2>
        </motion.div>

        <div className='mt-20 flex flex-col'>
          <VerticalTimeline animate={true} lineColor="rgba(59, 130, 246, 0.3)">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={`experience-${index}`}
                experience={experience}
                index={index}
              />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(ScholasticRecord, "education");
