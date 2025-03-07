"use client";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showSurprise, setShowSurprise] = useState(false);
  const [displayText, setDisplayText] = useState("");

  const surpriseMessage =
    " Surprise! You're an amazing person who brings joy to everyone around you. Your smile lights up the room, and your kindness touches hearts. Here's to another year of making beautiful memories! May all your dreams come true! 💕";

  const handleSurpriseClick = () => {
    setShowConfetti(true);
    setShowSurprise(true);
    setDisplayText("");
    // Play birthday song
    const audio = new Audio("/hbd.mp3");
    audio.play();
  };

  useEffect(() => {
    if (showSurprise) {
      let index = 0;
      const timer = setInterval(() => {
        if (index < surpriseMessage.length) {
          setDisplayText((prev) => prev + surpriseMessage[index]);
          index++;
        } else {
          clearInterval(timer);
        }
      }, 50); // Adjust speed of text appearance

      return () => clearInterval(timer);
    }
  }, [showSurprise]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-center">
      {showConfetti && <Confetti />}
      <motion.h1
        className="text-4xl font-bold text-pink-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🎉 Happy Birthday, Giftt ❤️! 🎂
      </motion.h1>
      <motion.p
        className="text-lg text-gray-700 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Wishing you a day filled with love, laughter, and joy! 💖
      </motion.p>
      <motion.img
        src="/gift.jpg"
        alt="Birthday Girl"
        className="rounded-full mt-6 w-48 h-48 border-4 border-pink-500"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.button
        className="mt-6 px-4 py-2 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSurpriseClick}
      >
        🎁 Click for a Surprise!
      </motion.button>
      {showSurprise && (
        <motion.div
          className="mt-6 p-6 bg-white rounded-lg shadow-lg border-2 border-pink-300 max-w-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: 1,
            rotate: 0,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 20,
            },
          }}
        >
          <motion.div
            className="text-lg text-gray-700 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {displayText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block ml-1"
            >
              |
            </motion.span>
          </motion.div>
          <motion.div
            className="mt-4 flex justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {Array.from("❤️🎈🎂✨").map((emoji, index) => (
              <motion.span
                key={index}
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: index * 0.2,
                }}
                className="text-2xl"
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
