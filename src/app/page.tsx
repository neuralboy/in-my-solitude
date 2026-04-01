"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-solitude-bg overflow-hidden relative">
      {/* Background Particles Placeholder */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 text-center"
      >
        <span className="text-solitude-text/60 uppercase tracking-[0.3em] text-xs mb-4 block">
          The Library
        </span>
        <h1 className="text-6xl md:text-8xl font-serif text-solitude-gold mb-6 drop-shadow-glow-gold">
          IN MY SOLITUDE
        </h1>
        <p className="text-solitude-text/70 italic text-lg max-w-lg mx-auto mb-12">
          "Knowledge kept in the dark finds its light in solitude."
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/library"
            className="px-8 py-4 bg-solitude-gold text-solitude-bg font-semibold rounded-md transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
          >
            Enter the Library
          </motion.a>
          <a
            href="/about"
            className="text-solitude-text/50 hover:text-solitude-gold transition-colors underline-offset-8 hover:underline"
          >
            About this place
          </a>
        </div>
      </motion.div>

      {/* Decorative blurred glow */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-solitude-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-solitude-violet/5 blur-[120px] rounded-full pointer-events-none" />
    </main>
  );
}
