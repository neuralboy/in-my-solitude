"use client";

import { mockBooks, mockCategories } from "@/lib/mockData";
import { VaultCard } from "@/components/vault/VaultCard";
import { motion } from "framer-motion";
import { ShieldAlert, BookOpen, Key, Lock, Scroll } from "lucide-react";

export default function VaultPage() {
  const restrictedBooks = mockBooks.filter((book) => book.is_restricted);

  return (
    <div className="min-h-screen bg-solitude-bg text-solitude-text pb-20 pt-32 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Vault Header Section */}
        <section className="text-center space-y-8 relative overflow-hidden">
           {/* Background blurred element */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[300px] bg-solitude-crimson/5 blur-[120px] rounded-full pointer-events-none" />
           
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-6 py-2 bg-solitude-crimson/10 border border-solitude-crimson/20 rounded-full text-solitude-crimson shadow-[0_0_20px_rgba(153,27,27,0.2)]"
           >
              <Lock size={16} fill="currentColor" />
              <span className="text-xs font-bold uppercase tracking-[0.4em]">The Restricted Collection</span>
           </motion.div>

           <div className="space-y-6 max-w-3xl mx-auto relative z-10">
              <h1 className="text-5xl md:text-7xl font-serif text-white tracking-wide">The Vault</h1>
              <p className="text-xl text-solitude-text/50 font-serif italic italic font-bold">
                 "These books are not restricted because they are dangerous. 
                 They are here because they require context, discernment, and readiness."
              </p>
              <div className="flex items-center justify-center gap-4 text-solitude-text/30 text-[10px] uppercase tracking-[0.3em] font-mono font-bold">
                 <span>{restrictedBooks.length} Restricted Volumes</span>
                 <div className="w-1 h-1 bg-solitude-crimson/40 rounded-full" />
                 <span>Curator Approval Required</span>
              </div>
           </div>
        </section>

        {/* Vault Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
           {restrictedBooks.length > 0 ? (
             restrictedBooks.map((book) => {
               const category = mockCategories.find((c) => c.id === book.category_id);
               return <VaultCard key={book.id} book={book} category={category} />;
             })
           ) : (
             <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-32 text-center bg-solitude-secondary/40 border border-solitude-border rounded-2xl border-dashed">
                <Scroll size={64} className="text-solitude-border mb-6 opacity-20" />
                <h3 className="text-2xl font-serif text-solitude-gold mb-2">The Vault is currently sealed</h3>
                <p className="text-solitude-text/40 max-w-sm">No restricted volumes have been added to the local archive yet.</p>
             </div>
           )}
        </section>

        {/* Access Philosophy Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-solitude-border/50 pt-20">
           <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start group">
              <div className="w-12 h-12 bg-solitude-gold/5 border border-solitude-gold/20 flex items-center justify-center rounded-lg group-hover:bg-solitude-gold/10 transition-all shadow-[0_0_15px_rgba(201,168,76,0.1)]">
                 <ShieldAlert size={24} className="text-solitude-gold" />
              </div>
              <h3 className="text-lg font-serif text-white uppercase tracking-widest leading-snug">Purpose, not curiosity</h3>
              <p className="text-xs text-solitude-text/50 leading-relaxed font-sans italic">
                 Vault books are highly sensitive subjects of suppressed history and consciousness. 
                 Only those with a clear, honest intent for their growth will find admission.
              </p>
           </div>
           
           <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start group">
              <div className="w-12 h-12 bg-solitude-gold/5 border border-solitude-gold/20 flex items-center justify-center rounded-lg group-hover:bg-solitude-gold/10 transition-all shadow-[0_0_15px_rgba(201,168,76,0.1)]">
                 <Key size={24} className="text-solitude-gold" />
              </div>
              <h3 className="text-lg font-serif text-white uppercase tracking-widest leading-snug">Personal Review</h3>
              <p className="text-xs text-solitude-text/50 leading-relaxed font-sans italic">
                 Every request is read personally by the curator. Access is granted as an act of trust. 
                 No automated approval system exists in these stacks.
              </p>
           </div>

           <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start group">
              <div className="w-12 h-12 bg-solitude-gold/5 border border-solitude-gold/20 flex items-center justify-center rounded-lg group-hover:bg-solitude-gold/10 transition-all shadow-[0_0_15px_rgba(201,168,76,0.1)]">
                 <BookOpen size={24} className="text-solitude-gold" />
              </div>
              <h3 className="text-lg font-serif text-white uppercase tracking-widest leading-snug">Full Responsibility</h3>
              <p className="text-xs text-solitude-text/50 leading-relaxed font-sans italic">
                 When entering the vault, you take full responsibility for how you engage with 
                 the content. We facilitate the search, you provide the discernment.
              </p>
           </div>
        </section>

      </div>
    </div>
  );
}
