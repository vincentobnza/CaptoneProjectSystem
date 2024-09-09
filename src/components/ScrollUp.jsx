import React from "react";
import { useEffect, useState } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollUp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.5, type: "spring", damping: 25 }}
            onClick={() => window.scrollTo(0, 0)}
            className="fixed bottom-5 right-5 py-2 px-3 grid place-content-center rounded-full bg-white border border-zinc-300 shadow-2xl shadow-zinc-500 cursor-pointer z-[80]"
          >
            <h1 className="text-xs font-medium">Scroll to top 👆</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
