"use client";

import { useState } from "react";
import { Upload, Send, CheckCircle2, Bookmark, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DonationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
     title: "",
     author: "",
     category: "",
     notes: "",
     file: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     if (!formData.title || !formData.file) return;
     setIsSubmitted(true);
  };

  return (
    <div className="bg-solitude-gold/5 border border-solitude-gold/20 rounded-xl p-8 h-full flex flex-col relative overflow-hidden">
       {/* Background decorative glow */}
       <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] bg-solitude-gold/5 blur-[100px] rounded-full pointer-events-none" />
       
       <div className="mb-8 flex items-center gap-3 relative z-10 text-solitude-gold">
          <div className="w-10 h-10 bg-solitude-gold/10 border border-solitude-gold/20 flex items-center justify-center rounded-lg">
             <Upload size={20} />
          </div>
          <h2 className="text-2xl font-serif text-white uppercase tracking-widest leading-loose">Donate a Book</h2>
       </div>

       <AnimatePresence mode="wait">
         {!isSubmitted ? (
           <motion.form 
             key="form"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onSubmit={handleSubmit} 
             className="space-y-6 flex-grow relative z-10"
           >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-mono text-solitude-text/30 block font-bold">Book Title (Required)</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 bg-solitude-bg border border-solitude-border rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-solitude-gold/50 focus:border-solitude-gold/30 transition-all font-sans text-sm"
                      placeholder="e.g. Ancient Lore"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-mono text-solitude-text/30 block font-bold">Author</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-solitude-bg border border-solitude-border rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-solitude-gold/50 focus:border-solitude-gold/30 transition-all font-sans text-sm"
                      placeholder="Who wrote it?"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                    />
                 </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] uppercase tracking-[0.4em] font-mono text-solitude-text/30 block font-bold">Suggested Category</label>
                 <select 
                   className="w-full px-4 py-3 bg-solitude-bg border border-solitude-border rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-solitude-gold/50 focus:border-solitude-gold/30 transition-all font-sans text-sm"
                   value={formData.category}
                   onChange={(e) => setFormData({...formData, category: e.target.value})}
                 >
                   <option value="">Select a Category...</option>
                   <option value="consciousness">Consciousness & Mind</option>
                   <option value="forbidden-history">Forbidden History</option>
                   <option value="esoteric">Esoteric & Occult</option>
                   <option value="law">Law Systems</option>
                 </select>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] uppercase tracking-[0.4em] font-mono text-solitude-text/30 block font-bold">Knowledge File (PDF required)</label>
                 <div className="group relative w-full h-32 border border-solitude-border border-dashed rounded-lg bg-solitude-bg hover:bg-solitude-secondary/60 hover:border-solitude-gold/50 transition-all flex flex-col items-center justify-center p-6 text-center cursor-pointer">
                    <input 
                       required
                       type="file" 
                       accept=".pdf"
                       className="absolute inset-0 opacity-0 cursor-pointer"
                       onChange={(e) => setFormData({...formData, file: e.target.files ? e.target.files[0] : null})}
                    />
                    {formData.file ? (
                      <div className="flex flex-col items-center gap-2">
                         <FileText size={32} className="text-solitude-gold" />
                         <span className="text-xs text-white font-mono uppercase tracking-widest line-clamp-1">{formData.file.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                         <Upload size={32} />
                         <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Drag or Click to Upload</span>
                      </div>
                    )}
                 </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] uppercase tracking-[0.4em] font-mono text-solitude-text/30 block font-bold">Knowledge Notes (Optional)</label>
                 <textarea 
                   className="w-full h-24 bg-solitude-bg border border-solitude-border rounded-lg p-4 text-white focus:outline-none focus:ring-1 focus:ring-solitude-gold/50 focus:border-solitude-gold/30 transition-all font-sans text-sm resize-none italic"
                   placeholder="Share any context about this version or its source... "
                   value={formData.notes}
                   onChange={(e) => setFormData({...formData, notes: e.target.value})}
                 />
              </div>

              <button 
                type="submit"
                disabled={!formData.title || !formData.file}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-solitude-gold text-solitude-bg font-bold rounded-lg uppercase tracking-widest text-xs hover:shadow-glow-gold transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                 <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 Submit Donation
              </button>

              <p className="text-[10px] text-solitude-text/30 text-center uppercase tracking-widest leading-loose"> All donations are reviewed for quality and integrity before being published. </p>
           </motion.form>
         ) : (
           <motion.div 
             key="success"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex flex-col items-center justify-center text-center space-y-6 flex-grow py-12 relative z-10"
           >
              <div className="w-16 h-16 bg-solitude-gold/10 border border-solitude-gold/20 flex items-center justify-center rounded-full text-solitude-gold shadow-[0_0_25px_rgba(201,168,76,0.3)]">
                 <CheckCircle2 size={32} />
              </div>
              <div className="space-y-2">
                 <h3 className="text-xl font-serif text-white uppercase tracking-widest leading-snug">Donation Pending Review</h3>
                 <p className="text-sm text-solitude-text/40 font-sans italic italic font-bold max-w-[280px]">
                    Your contribution of "{formData.title}" has been added to our curation queue. 
                 </p>
                 <p className="text-[10px] text-solitude-gold/50 uppercase tracking-[0.2em] font-bold mt-4">
                    Thank you for sharing your knowledge.
                 </p>
              </div>
              <button 
                 onClick={() => setIsSubmitted(false)}
                 className="text-[10px] text-solitude-gold hover:text-white uppercase tracking-[0.2em] font-bold"
              >
                 Donate Another?
              </button>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}
