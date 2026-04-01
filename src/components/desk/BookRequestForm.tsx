"use client";

import { useState } from "react";
import { Search, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BookRequestForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
     title: "",
     author: "",
     why: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     if (!formData.title) return;
     setIsSubmitted(true);
  };

  return (
    <div className="bg-solitude-secondary/30 border border-solitude-border rounded-xl p-8 h-full flex flex-col">
       <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-solitude-gold/10 border border-solitude-gold/20 flex items-center justify-center rounded-lg text-solitude-gold">
             <Search size={20} />
          </div>
          <h2 className="text-2xl font-serif text-white uppercase tracking-widest">Find a Book</h2>
       </div>

       <AnimatePresence mode="wait">
         {!isSubmitted ? (
           <motion.form 
             key="form"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onSubmit={handleSubmit} 
             className="space-y-6 flex-grow"
           >
              <div className="space-y-4">
                 <label className="text-[10px] uppercase tracking-[0.4em] font-mono text-solitude-text/30 block font-bold">Book Title (Required)</label>
                 <input 
                   required
                   type="text" 
                   className="w-full px-4 py-3 bg-solitude-bg border border-solitude-border rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-solitude-gold/50 focus:border-solitude-gold/30 transition-all font-sans text-sm"
                   placeholder="e.g. The Kybalion"
                   value={formData.title}
                   onChange={(e) => setFormData({...formData, title: e.target.value})}
                 />
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] uppercase tracking-[0.4em] font-mono text-solitude-text/30 block font-bold">Author (Optional)</label>
                 <input 
                   type="text" 
                   className="w-full px-4 py-3 bg-solitude-bg border border-solitude-border rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-solitude-gold/50 focus:border-solitude-gold/30 transition-all font-sans text-sm"
                   placeholder="Who wrote it?"
                   value={formData.author}
                   onChange={(e) => setFormData({...formData, author: e.target.value})}
                 />
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] uppercase tracking-[0.4em] font-mono text-solitude-text/30 block font-bold">Why this book matters (Optional)</label>
                 <textarea 
                   className="w-full h-32 bg-solitude-bg border border-solitude-border rounded-lg p-4 text-white focus:outline-none focus:ring-1 focus:ring-solitude-gold/50 focus:border-solitude-gold/30 transition-all font-sans text-sm resize-none italic"
                   placeholder="Tell the curator why we should source this volume..."
                   value={formData.why}
                   onChange={(e) => setFormData({...formData, why: e.target.value})}
                 />
              </div>

              <button 
                type="submit"
                disabled={!formData.title}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-solitude-gold text-solitude-bg font-bold rounded-lg uppercase tracking-widest text-xs hover:shadow-glow-gold transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                 <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 Submit Request
              </button>
           </motion.form>
         ) : (
           <motion.div 
             key="success"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex flex-col items-center justify-center text-center space-y-6 flex-grow py-12"
           >
              <div className="w-16 h-16 bg-solitude-gold/10 border border-solitude-gold/20 flex items-center justify-center rounded-full text-solitude-gold">
                 <CheckCircle2 size={32} />
              </div>
              <div className="space-y-2">
                 <h3 className="text-xl font-serif text-white uppercase tracking-widest leading-snug">Request Logged</h3>
                 <p className="text-sm text-solitude-text/40 font-sans italic italic font-bold max-w-[240px]">
                    The curator will begin the search for this volume across the hidden archives.
                 </p>
              </div>
              <button 
                 onClick={() => setIsSubmitted(false)}
                 className="text-[10px] text-solitude-gold hover:text-white uppercase tracking-[0.2em] font-bold"
              >
                 Request Another?
              </button>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}
