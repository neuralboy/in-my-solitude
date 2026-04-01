"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { mockBooks } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, ArrowLeft, Send, CheckCircle2, Bookmark } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function VaultRequestPage() {
  const { id } = useParams();
  const book = mockBooks.find((b) => b.id === id);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
     reason: "",
     background: "",
     agreed: false
  });

  if (!book) return null;

  const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     if (formData.reason.length < 100 || !formData.agreed) return;
     // Simulate submission
     setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-solitude-bg text-solitude-text pb-20 pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/vault" className="inline-flex items-center gap-2 text-solitude-text/30 hover:text-solitude-gold transition-colors mb-12 uppercase tracking-widest text-xs font-bold">
           <ArrowLeft size={16} />
           Return to Vault
        </Link>

        {/* Request Container */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start relative overflow-hidden">
           
           <AnimatePresence mode="wait">
             {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="md:col-span-3 space-y-12 relative z-10"
                >
                   <header className="space-y-4">
                      <h1 className="text-4xl font-serif text-white tracking-widest leading-tight uppercase">Request Entry</h1>
                      <div className="h-px w-full bg-gradient-to-r from-solitude-crimson/50 to-transparent" />
                      <p className="text-sm text-solitude-text/50 font-sans italic leading-relaxed">
                         The curator reviews every request for the restricted section. 
                         Please speak with honesty regarding your intent.
                      </p>
                   </header>

                   <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="space-y-4">
                         <label className="text-[10px] uppercase tracking-[0.4em] font-mono text-solitude-gold/70 block font-bold">
                            1. Why do you wish to read this volume?
                         </label>
                         <textarea 
                            required
                            minLength={100}
                            placeholder="Please share your intent... (Minimum 100 characters)" 
                            className="w-full h-48 bg-solitude-secondary/60 border border-solitude-border rounded-xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-solitude-crimson focus:border-solitude-crimson/50 transition-all font-sans text-sm leading-relaxed"
                            value={formData.reason}
                            onChange={(e) => setFormData({...formData, reason: e.target.value})}
                         />
                         <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase">
                            <span className={formData.reason.length < 100 ? "text-solitude-crimson" : "text-solitude-gold"}>
                               {formData.reason.length} / 100 characters min
                            </span>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <label className="text-[10px] uppercase tracking-[0.4em] font-mono text-solitude-gold/70 block font-bold">
                            2. Tell us about your current journey (Optional)
                         </label>
                         <textarea 
                            placeholder="Share any background that may provide context..." 
                            className="w-full h-32 bg-solitude-secondary/60 border border-solitude-border rounded-xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-solitude-gold focus:border-solitude-gold/50 transition-all font-sans text-sm leading-relaxed"
                            value={formData.background}
                            onChange={(e) => setFormData({...formData, background: e.target.value})}
                         />
                      </div>

                      <div className="flex items-start gap-3 group">
                         <input 
                            type="checkbox" 
                            id="responsibility"
                            required
                            className="mt-1 accent-solitude-crimson border-solitude-border bg-solitude-bg w-4 h-4 cursor-pointer"
                            checked={formData.agreed}
                            onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
                         />
                         <label htmlFor="responsibility" className="text-xs text-solitude-text/50 font-sans leading-relaxed cursor-pointer group-hover:text-solitude-text/70">
                            I take full responsibility for how I engage with this content. I understand the curator’s 
                            decision to grant or deny access is final.
                         </label>
                      </div>

                      <button 
                         type="submit"
                         disabled={formData.reason.length < 100 || !formData.agreed}
                         className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-solitude-crimson text-white font-bold rounded-lg uppercase tracking-widest text-xs hover:shadow-[0_0_25px_rgba(153,27,27,0.3)] transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                      >
                         <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                         Submit Request
                      </button>
                   </form>
                </motion.div>
             ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="md:col-span-5 flex flex-col items-center justify-center p-12 text-center bg-solitude-secondary/40 border border-solitude-crimson/20 rounded-2xl relative z-10 space-y-8"
                >
                   <div className="w-20 h-20 bg-solitude-crimson/10 border border-solitude-crimson/30 text-solitude-crimson flex items-center justify-center rounded-full shadow-[0_0_30px_rgba(153,27,27,0.2)]">
                      <CheckCircle2 size={40} />
                   </div>
                   <div className="space-y-4 max-w-lg">
                      <h2 className="text-3xl font-serif text-white tracking-widest uppercase mb-2">Request Submitted</h2>
                      <p className="text-lg text-solitude-text/60 font-serif italic italic font-bold">
                         "Patience is the companion of wisdom."
                      </p>
                      <p className="text-sm text-solitude-text/40 leading-relaxed font-sans mt-6">
                         Your request is with the curator. Every request is read personally. 
                         You will be notified of the outcome within 3—5 sunsets.
                      </p>
                   </div>
                   <div className="flex gap-4">
                      <Link href="/library" className="px-8 py-3 bg-solitude-secondary border border-solitude-border text-solitude-gold rounded font-bold uppercase tracking-widest text-[10px]">
                         Return to Library
                      </Link>
                      <Link href="/profile" className="px-8 py-3 bg-solitude-gold text-solitude-bg rounded font-bold uppercase tracking-widest text-[10px]">
                         Check Profile Status
                      </Link>
                   </div>
                </motion.div>
             )}
           </AnimatePresence>

           {/* Right Column: Book Peek */}
           {!isSubmitted && (
             <aside className="md:col-span-2 space-y-8">
                <div className="sticky top-40 space-y-8 p-8 bg-solitude-secondary/40 border border-solitude-border rounded-xl">
                   <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-solitude-border/50 shadow-2xl">
                      {book.cover_url && <Image src={book.cover_url} alt={book.title} fill className="object-cover opacity-50 filter grayscale" />}
                      <div className="absolute inset-0 flex items-center justify-center text-solitude-crimson/30">
                         <ShieldAlert size={80} />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] text-solitude-crimson font-mono uppercase tracking-[0.3em] font-bold">
                         <Bookmark size={10} />
                         <span>Restricted Volume</span>
                      </div>
                      <h3 className="text-xl font-serif text-white leading-tight">{book.title}</h3>
                      <p className="text-xs text-solitude-text/40 font-sans italic opacity-60 line-clamp-1">{book.author || "Anonymous"}</p>
                   </div>
                </div>
             </aside>
           )}

        </div>

      </div>
    </div>
  );
}
