import React, { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LoadingQuotes() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const quotes = [
    {
      quote: "Code is like humor. When you have to explain it, it's bad",
      author: "Cory House",
    },
    {
      quote: "Strive for continuous improvement, instead of perfection",
      author: "Kim Collins",
    },
    {
      quote: "Learning to code is learning to create and innovate",
      author: "Enda Kenny",
    },
    {
      quote:
        "Programming isn't about what you know; it's about what you can figure out",
      author: "Chris Pine",
    },
    {
      quote: "The more you practice, the better you get",
      author: "Unknown",
    },
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      const navigationTimer = setTimeout(() => {
        navigate("/assessments");
      }, 2000);

      return () => clearTimeout(navigationTimer);
    }
  }, [isVisible, navigate]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="w-full h-screen bg-zinc-900 grid place-items-center text-white font-Merriweather"
        >
          <div className="w-full max-w-screen-lg mx-auto flex flex-col justify-center items-center p-10 text-center gap-6">
            <h1 className="text-3xl">{randomQuote.quote}</h1>
            <p className="text-zinc-400">- {randomQuote.author}</p>
            <BarLoader color="white" className="mt-10" speedMultiplier={1} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
