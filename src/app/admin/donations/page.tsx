"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PackageCheck, CheckCircle2, XCircle, FileText, ExternalLink, MoreVertical, Archive } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock donations for development
const mockDonations = [
  { id: 'd1', user: 'Julian Sol', title: 'The Gnostic Gospels', author: 'Elaine Pagels', category: 'esoteric', note: 'A high-quality scan of the original edition. Essential for the mystical section.', date: '2024-03-29' },
  { id: 'd2', user: 'Seraphina', title: 'Forbidden Archaeology', author: 'Michael Cremo', category: 'forbidden-history', note: 'Evidence for extreme human antiquity. Matches our manifesto perfectly.', date: '2024-03-28' },
  { id: 'd3', user: 'Anonymous Wanderer', title: 'The Hermetic Tradition', author: 'Julius Evola', category: 'esoteric', note: 'Essential study on the symbols of alchemy.', date: '2024-03-25' },
];

export default function DonationReviewPage() {
  const [donations, setDonations] = useState(mockDonations);

  const handleAction = (id: string, action: 'accept' | 'decline') => {
     if (action === 'accept') {
        alert("The volume has been officially admitted to the archive. Proceeding to metadata categorization.");
     }
     setDonations(donations.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div className="space-y-2">
            <h1 className="text-4xl font-serif text-white tracking-widest uppercase mb-1">Donation Inbox</h1>
            <p className="text-solitude-text/30 text-xs font-mono uppercase tracking-[0.4em] font-bold">Reviewing and Validating User-Contributed Knowledge Assets</p>
         </div>
      </header>

      {/* Grid: Pending Donations */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
         {donations.map((donation, i) => (
            <motion.div
               key={donation.id}
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="p-8 bg-solitude-secondary/40 border border-solitude-border rounded-xl flex flex-col gap-8 relative group overflow-hidden"
            >
               {/* Background detail */}
               <div className="absolute top-0 right-0 w-24 h-24 bg-solitude-gold/5 blur-2xl group-hover:bg-solitude-gold/10 transition-colors pointer-events-none" />
               
               <header className="space-y-2">
                  <div className="flex items-center justify-between mb-4">
                     <span className="text-[10px] text-solitude-gold uppercase tracking-[0.3em] font-bold">Pending Review</span>
                     <span className="text-[9px] text-solitude-text/30 font-mono tracking-widest uppercase">{donation.date}</span>
                  </div>
                  <h3 className="text-xl font-serif text-white line-clamp-2 leading-snug group-hover:text-solitude-gold transition-colors">{donation.title}</h3>
                  <p className="text-sm text-solitude-text/50 font-sans italic italic font-bold tracking-wide">{donation.author || "Anonymous Source"}</p>
               </header>

               <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-solitude-bg/60 border border-solitude-border rounded text-[10px] uppercase font-bold tracking-widest text-solitude-text/30">
                     <FileText size={16} />
                     <span>Original PDF Format</span>
                  </div>
                  <p className="text-xs text-solitude-text/50 italic leading-relaxed line-clamp-3">
                     "{donation.note}"
                  </p>
               </div>

               <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-solitude-border/50">
                  <button 
                    onClick={() => handleAction(donation.id, 'accept')}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-lg"
                  >
                     <CheckCircle2 size={14} />
                     Accept
                  </button>
                  <button 
                    onClick={() => handleAction(donation.id, 'decline')}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-solitude-crimson/10 border border-solitude-crimson/30 text-solitude-crimson rounded text-[10px] font-bold uppercase tracking-widest hover:bg-solitude-crimson hover:text-white transition-all shadow-lg"
                  >
                     <XCircle size={14} />
                     Discard
                  </button>
               </div>
            </motion.div>
         ))}
      </section>

      {/* Empty State */}
      {donations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-center bg-solitude-secondary/20 border border-solitude-border border-dashed rounded-2xl">
           <Archive size={64} className="text-solitude-border mb-6 opacity-20" />
           <h3 className="text-2xl font-serif text-solitude-text/40 mb-2 uppercase tracking-widest leading-loose">The Donation Inbox is Clear</h3>
           <p className="text-xs text-solitude-text/20 max-w-sm uppercase tracking-widest leading-loose">All community contributions have been reviewed and processed.</p>
        </div>
      )}

    </div>
  );
}
