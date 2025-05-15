import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };
/*template_li1u7ka*/ 
/*service_ik7kppd*/
//YdWwEgCsZJN3D5iKq 
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_6hs7dyb',
        'template_xhef82k',
        {
          from_name: form.name,
          to_name: "Adrish Basak",
          from_email: form.email,
          to_email: "adrishbasak003@gmail.com",
          message: form.message,
        },
        'gaxooISZjUYhcdSa9'
      )
      .then(
        () => {
          setLoading(false);
          setShowSuccess(true);
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            setShowSuccess(false);
          }, 5000);

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-visible relative`}
    >
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", damping: 12 }}
            className="fixed top-24 left-0 right-0 mx-auto w-80 z-50 bg-gradient-to-r from-[#202942] to-[#151729] p-4 rounded-xl shadow-lg border border-[#3a7bd5]/30 flex items-center justify-center"
            style={{
              boxShadow: '0 10px 40px -5px rgba(63, 81, 181, 0.4)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-[#3a7bd5] to-[#3f51b5] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-medium text-center">
              Thank you! I'll get back to you soon.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-gradient-to-b from-[#151729] to-[#0d1321] p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,130,255,0.3)]'
        style={{
          boxShadow: '0 8px 32px -5px rgba(63, 81, 181, 0.3)',
          border: '1px solid rgba(99, 130, 255, 0.15)',
          backdropFilter: 'blur(4px)'
        }}
      >
        <p className='text-[#8892b0] font-medium uppercase tracking-wider text-sm'>Get in touch</p>
        <h3 className='text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] mt-2 bg-gradient-to-r from-[#3a7bd5] to-[#3f51b5] bg-clip-text text-transparent'>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-[#a8b2d1] font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className='bg-[#1b2238] py-4 px-6 placeholder:text-[#546188] text-white rounded-lg outline-none border-none font-medium transition-all duration-300 focus:ring-2 focus:ring-[#3968d3] shadow-inner hover:bg-[#202942] hover:shadow-[0_0_5px_rgba(63,81,181,0.5)_inset]'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-[#a8b2d1] font-medium mb-4'>Your Email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className='bg-[#1b2238] py-4 px-6 placeholder:text-[#546188] text-white rounded-lg outline-none border-none font-medium transition-all duration-300 focus:ring-2 focus:ring-[#3968d3] shadow-inner hover:bg-[#202942] hover:shadow-[0_0_5px_rgba(63,81,181,0.5)_inset]'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-[#a8b2d1] font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What would you like to say?'
              className='bg-[#1b2238] py-4 px-6 placeholder:text-[#546188] text-white rounded-lg outline-none border-none font-medium transition-all duration-300 focus:ring-2 focus:ring-[#3968d3] shadow-inner resize-none hover:bg-[#202942] hover:shadow-[0_0_5px_rgba(63,81,181,0.5)_inset]'
            />
          </label>

          <button
            type='submit'
            className='relative bg-gradient-to-r from-[#3a7bd5] to-[#3f51b5] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(63,81,181,0.6)] hover:scale-105 active:scale-95 overflow-hidden group'
            style={{
              boxShadow: '0 4px 15px -3px rgba(63, 81, 181, 0.4)'
            }}
          >
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px] flex items-center justify-center overflow-hidden'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
