"use client";

import { useParams } from "next/navigation";
import { mockBooks, mockCategories } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Book as BookIcon, Download, Clock, Star, ArrowLeft, ExternalLink, Bookmark } from "lucide-react";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function BookDetailPage() {
  const { id } = useParams();
  const book = mockBooks.find((b) => b.id === id);
  const category = mockCategories.find((c) => c.id === book?.category_id);

  if (!book) {
    return (
      <div className="min-h-screen bg-solitude-bg flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-serif text-solitude-gold mb-4">Volume Not Found</h1>
        <p className="text-solitude-text/50 mb-8 max-w-sm">The book you are looking for does not reside in our current stacks.</p>
        <Link href="/library" className="px-8 py-3 bg-solitude-gold text-solitude-bg font-bold rounded-md uppercase tracking-widest text-xs">
          Return to the Stacks
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-solitude-bg text-solitude-text pb-20">
      
      {/* Top Navbar Layer */}
      <nav className="fixed top-0 w-full z-50 bg-solitude-bg/40 backdrop-blur-md border-b border-solitude-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/library" className="flex items-center gap-2 text-solitude-gold hover:text-white transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-semibold uppercase tracking-widest">Back to Library</span>
          </Link>
          <div className="flex items-center gap-4 text-solitude-text/40 text-xs">
             <span>{book.views} Views</span>
             <span>{book.downloads} Downloads</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left Column: Book Cover & Quick Actions */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="relative aspect-[3/4] w-full max-w-[400px] mx-auto overflow-hidden rounded-xl border border-solitude-border shadow-[0_20px_50px_rgba(0,0,0,0.6)] group"
           >
              {book.cover_url ? (
                <Image src={book.cover_url} alt={book.title} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-10 bg-solitude-secondary">
                  <BookIcon size={120} />
                </div>
              )}
              
              {book.is_restricted && (
                 <div className="absolute inset-0 bg-solitude-bg/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-8 text-center">
                    <Star size={48} className="text-solitude-crimson mb-4" />
                    <h3 className="text-xl font-serif text-white mb-2">Restricted Access</h3>
                    <p className="text-sm text-solitude-text/60 mb-6 italic leading-relaxed">
                      "Some knowledge requires more than curiosity. It requires readiness."
                    </p>
                    <Link href={`/vault/request/${book.id}`} className="px-6 py-2 bg-solitude-crimson text-white rounded font-bold uppercase tracking-widest text-[10px]">
                      Request Vault Access
                    </Link>
                 </div>
              )}
           </motion.div>

           {/* Buttons Stack */}
           <div className="flex flex-col gap-4">
              <button 
                disabled={book.is_restricted}
                className={cn(
                  "w-full flex items-center justify-center gap-3 px-8 py-4 bg-solitude-gold text-solitude-bg font-bold rounded-lg uppercase tracking-widest text-sm shadow-glow-gold hover:shadow-[0_0_25px_rgba(201,168,76,0.3)] transition-all",
                  book.is_restricted && "opacity-50 cursor-not-allowed filter grayscale"
                )}
              >
                 <BookIcon size={18} />
                 Read Online
              </button>
              <button 
                 disabled={book.is_restricted}
                 className={cn(
                  "w-full flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg uppercase tracking-widest text-sm hover:bg-white/10 transition-all",
                  book.is_restricted && "opacity-50 cursor-not-allowed"
                )}
              >
                 <Download size={18} />
                 Download PDF
              </button>
           </div>
        </aside>

        {/* Right Column: Detailed Info */}
        <div className="lg:col-span-8 flex flex-col gap-10">
           
           {/* Section 1: Identify */}
           <section>
              <div className="flex items-center gap-3 mb-6">
                 {category && <CategoryBadge category={category} variant="solid" />}
                 <div className="h-px flex-grow bg-solitude-border" />
                 <span className="text-xs font-mono text-solitude-text/30 uppercase tracking-[0.4em]">MS-#{book.id.slice(0, 4)}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 leading-tight">
                {book.title}
              </h1>
              <p className="text-xl md:text-2xl text-solitude-gold/70 font-sans italic tracking-wide mb-8">
                {book.author || "Anonymous Source"}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-10">
                 {book.tags?.map(tag => (
                   <span key={tag} className="px-3 py-1 bg-solitude-elevated border border-solitude-border text-[10px] text-solitude-text/40 rounded uppercase tracking-widest font-mono">
                     #{tag}
                   </span>
                 ))}
              </div>
           </section>

           {/* Section 2: Narrative & Description */}
           <section className="space-y-6">
              <div className="flex items-center gap-2 text-solitude-text/30 text-xs font-bold uppercase tracking-widest">
                 <Bookmark size={14} />
                 <span>Description</span>
              </div>
              <p className="text-lg text-solitude-text/70 font-sans leading-relaxed max-w-3xl">
                {book.description || "The original description of this work is undergoing archival restoration."}
              </p>
           </section>

           {/* Curator's Note in Italics (Section 6, Page 3) */}
           {book.curator_note && (
             <section className="p-8 bg-solitude-secondary/40 border border-solitude-gold/10 rounded-xl relative overflow-hidden group">
                <div className="absolute -right-4 -top-8 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Star size={180} className="text-solitude-gold" />
                </div>
                <div className="flex items-center gap-2 text-solitude-gold/50 text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">
                   <Star size={12} className="text-solitude-gold" fill="currentColor" />
                   <span>Curator's Annotation</span>
                </div>
                <p className="text-solitude-text/80 font-serif italic text-lg leading-relaxed relative z-10 italic">
                  "{book.curator_note}"
                </p>
             </section>
           )}

           {/* Section 3: Metadata / Footer */}
           <footer className="pt-10 border-t border-solitude-border flex flex-wrap gap-10 text-xs text-solitude-text/40 font-mono tracking-widest uppercase">
              <div className="flex flex-col gap-1">
                 <span className="text-solitude-text/20">Added to Stacks</span>
                 <span>{new Date(book.added_date).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-solitude-text/20">License</span>
                 <span>Public Resource</span>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-solitude-text/20">Format</span>
                 <span>High-Res Digital Scan</span>
              </div>
           </footer>

        </div>

      </div>

    </div>
  );
}
