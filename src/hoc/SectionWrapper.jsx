import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = (Component, idName) => function HOC() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative z-0 py-16"
      id={idName}
    >
      <Component />
    </motion.section>
  );
};

export default SectionWrapper;
