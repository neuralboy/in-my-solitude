"use client";

import { motion } from "framer-motion";
import { BookRequestForm } from "@/components/desk/BookRequestForm";
import { DonationForm } from "@/components/desk/DonationForm";
import { Compass, Megaphone, HeartHandshake } from "lucide-react";

export default function DeskPage() {
  return (
    <div className="min-h-screen bg-solitude-bg text-solitude-text pb-20 pt-40 px-6 overflow-hidden relative">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-12">
           <div className="max-w-2xl space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-solitude-gold/5 border border-solitude-gold/20 rounded text-solitude-gold text-[10px] uppercase tracking-[0.4em] font-bold"
              >
                 <Compass size={14} />
                 <span>Community Participation</span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-serif text-white uppercase tracking-widest leading-tight">The Request Desk</h1>
              <p className="text-xl text-solitude-text/50 font-serif italic italic font-bold max-w-xl">
                 "This library grows with the community. Ask for what you need. Share what you have."
              </p>
           </div>
           
           <div className="hidden lg:flex items-center gap-8 mb-4">
              <div className="flex flex-col text-right">
                 <span className="text-[10px] text-solitude-gold/50 uppercase tracking-[0.3em] font-bold">Open Requests</span>
                 <span className="text-2xl font-serif text-white">42</span>
              </div>
              <div className="w-px h-12 bg-solitude-border" />
              <div className="flex flex-col text-right">
                 <span className="text-[10px] text-solitude-gold/50 uppercase tracking-[0.3em] font-bold">Donations Today</span>
                 <span className="text-2xl font-serif text-white">08</span>
              </div>
           </div>
        </header>

        {/* Forms Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
           >
              <BookRequestForm />
           </motion.div>

           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
           >
              <DonationForm />
           </motion.div>
        </section>

        {/* Community Notice Footer */}
        <section className="bg-solitude-secondary/20 border border-solitude-border rounded-2xl p-10 md:p-16 relative overflow-hidden text-center group">
           <div className="absolute -top-32 -left-32 w-64 h-64 bg-solitude-gold/5 blur-[80px] rounded-full group-hover:bg-solitude-gold/10 transition-all" />
           
           <div className="flex flex-col items-center gap-8 relative z-10 max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-solitude-gold/10 border border-solitude-gold/20 flex items-center justify-center rounded-3xl text-solitude-gold rotate-12 group-hover:rotate-0 transition-transform duration-700">
                 <HeartHandshake size={32} />
              </div>
              <div className="space-y-4">
                 <h3 className="text-2xl font-serif text-white uppercase tracking-widest leading-loose">A House Maintained by the Many</h3>
                 <p className="text-sm text-solitude-text/40 leading-relaxed font-sans max-w-2xl mx-auto italic">
                    This is a free library maintained with care. If a book matters to you, 
                    please consider sharing the library link itself — not just individual files. 
                    This keeps the ecosystem alive. By contributing what you have, you directly 
                    facilitate the awakening of whoever walks through these digital stacks next.
                 </p>
              </div>
              <div className="h-px w-24 bg-solitude-gold/20" />
              <p className="text-[10px] text-solitude-gold/40 uppercase tracking-[0.5em] font-bold">No monetization. No gatekeeping. Just Solidarity.</p>
           </div>
        </section>

      </div>
    </div>
  );
}
