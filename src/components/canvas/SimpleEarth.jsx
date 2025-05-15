import React from "react";
import { motion } from "framer-motion";

// A simple, non-3D Earth substitute that will render reliably
const SimpleEarth = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-[250px] h-[250px] rounded-full bg-gradient-to-br from-[#1a237e] via-[#303f9f] to-[#673ab7] relative"
      >
        {/* Grid lines for Earth effect */}
        <div className="absolute inset-0 rounded-full border-t-[1px] border-b-[1px] border-white border-opacity-20 transform rotate-[20deg]"></div>
        <div className="absolute inset-0 rounded-full border-t-[1px] border-b-[1px] border-white border-opacity-20 transform rotate-[60deg]"></div>
        <div className="absolute inset-0 rounded-full border-t-[1px] border-b-[1px] border-white border-opacity-20 transform rotate-[100deg]"></div>
        <div className="absolute inset-0 rounded-full border-t-[1px] border-b-[1px] border-white border-opacity-20 transform rotate-[140deg]"></div>
        
        {/* Land masses */}
        <motion.div 
          className="absolute w-[70px] h-[40px] bg-[#64b5f6] bg-opacity-40 rounded-full blur-[2px] top-[20%] left-[20%]"
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        ></motion.div>
        <motion.div 
          className="absolute w-[90px] h-[60px] bg-[#64b5f6] bg-opacity-40 rounded-full blur-[2px] bottom-[30%] right-[10%]"
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        ></motion.div>
        
        {/* Glow effect */}
        <div className="absolute inset-[-15px] rounded-full bg-[#915eff] opacity-20 blur-[20px]"></div>
      </motion.div>
    </div>
  );
};

export default SimpleEarth;
