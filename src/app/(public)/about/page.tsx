"use client";

import { motion } from "framer-motion";
import { Star, Eye, Shield, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-solitude-bg text-solitude-text pb-20 pt-40 px-6">
      <div className="max-w-4xl mx-auto space-y-32">
        
        {/* The Manifesto Section */}
        <section className="space-y-12">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center"
           >
              <h1 className="text-6xl font-serif text-solitude-gold mb-6 tracking-wide">The Manifesto</h1>
              <p className="text-xl text-solitude-text/50 font-serif italic italic font-bold">"Knowledge is a light that should be shared in the quietest of places."</p>
           </motion.div>

           <div className="prose prose-invert prose-gold max-w-none text-lg leading-relaxed text-solitude-text/70 space-y-8 font-sans">
              <p>
                This is not a typical digital library. It was born in <strong>solitude</strong> — assembled
                book by book during a profound personal journey through the dark night of the soul.
                Every title in this archive played a role in one person's path toward consciousness,
                clarity, and liberation from mass mental conditioning.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
                 <div className="space-y-4">
                    <div className="flex items-center gap-3 text-solitude-gold">
                       <Eye size={24} />
                       <h3 className="text-xl uppercase tracking-widest font-bold">Why we exist</h3>
                    </div>
                    <p className="text-sm">
                       Entire categories of human understanding — real history, consciousness science,
                       and hidden architectures of control — have been buried or mocked. 
                       This library exists as an act of resistance.
                    </p>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3 text-solitude-gold">
                       <Shield size={24} />
                       <h3 className="text-xl uppercase tracking-widest font-bold">How it works</h3>
                    </div>
                    <p className="text-sm">
                       No ads. No trackings. No algorithms. Just pure archival knowledge. 
                       Most books are freely available. High-level materials reside in the Vault.
                    </p>
                 </div>
              </div>

              <p>
                The library grows with the community. You can request books. You can donate books.
                You can simply read, in solitude, and find your own way home.
              </p>
           </div>
        </section>

        {/* The Curator Section */}
        <section id="curator" className="p-12 bg-solitude-secondary/60 border border-solitude-border rounded-2xl relative overflow-hidden">
           <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[150%] bg-solitude-gold/5 blur-[120px] rounded-full pointer-events-none" />
           <div className="max-w-2xl">
              <h2 className="text-3xl font-serif text-white mb-6 uppercase tracking-widest">A Letter from the Curator</h2>
              <div className="space-y-6 text-solitude-text/60 italic leading-relaxed text-lg">
                 <p>
                    "I began this journey when the world as I knew it ceased to make sense. 
                    I looked for answers in the books mainstream institutions often ignored."
                 </p>
                 <p>
                    "In the profound quiet of solitude, I found not just information, but the 
                    keys to my own mental liberation. This library is my way of passing 
                    those keys along to the next wanderer."
                 </p>
                 <p className="pt-4 text-solitude-gold font-bold uppercase tracking-[0.4em] text-xs">
                    — THE CURATOR
                 </p>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}
