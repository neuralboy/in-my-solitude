"use client";

import { motion } from "framer-motion";
import { Lock, EyeOff, ShieldCheck } from "lucide-react";
import { Book, Category } from "@/types/database";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface VaultCardProps {
  book: Book;
  category?: Category;
}

export function VaultCard({ book, category }: VaultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative bg-solitude-bg/40 border border-solitude-crimson/20 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-solitude-crimson/40"
    >
      {/* Background/Blurred Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-solitude-crimson/5 blur-3xl pointer-events-none group-hover:bg-solitude-crimson/10 transition-colors duration-500" />
      
      <div className="flex flex-col md:flex-row h-full">
        
        {/* Cover Section (Blurred) */}
        <div className="w-full md:w-1/3 aspect-[3/4] md:aspect-auto relative bg-solitude-secondary overflow-hidden">
          {book.cover_url ? (
            <div className="relative w-full h-full filter blur-md grayscale group-hover:transition-all group-hover:duration-500">
               <Image src={book.cover_url} alt={book.title} fill className="object-cover opacity-30" />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
               <Lock size={64} />
            </div>
          )}
          
          {/* Overlay Icons */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
             <div className="w-12 h-12 bg-solitude-crimson/10 border border-solitude-crimson/20 rounded-full flex items-center justify-center text-solitude-crimson shadow-[0_0_15px_rgba(153,27,27,0.3)]">
                <Lock size={20} />
             </div>
             <span className="text-[10px] uppercase tracking-widest text-solitude-crimson/60 font-mono font-bold">Restricted</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/3 p-6 flex flex-col justify-center">
           <header className="mb-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-solitude-text/30 font-mono mb-2 block">The Vault Collection</span>
              <h2 className="text-xl font-serif text-white group-hover:text-solitude-gold transition-colors duration-300 line-clamp-2 leading-snug">
                {book.title}
              </h2>
              <p className="text-sm font-sans text-solitude-text/50 italic">{book.author || "Anonymous"}</p>
           </header>

           <div className="space-y-4">
              <p className="text-sm text-solitude-text/40 line-clamp-2 italic leading-relaxed">
                 {book.description ? book.description.substring(0, 80) + "..." : "Description restricted until access is granted."}
              </p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-solitude-border/50">
                 <Link 
                   href={`/vault/request/${book.id}`}
                   className="flex items-center justify-center gap-2 px-6 py-2.5 bg-solitude-crimson/10 border border-solitude-crimson/30 rounded text-solitude-crimson text-xs font-bold uppercase tracking-widest hover:bg-solitude-crimson hover:text-white transition-all duration-300"
                 >
                    <ShieldCheck size={14} />
                    Request Access
                 </Link>
                 <Link 
                   href={`/book/${book.id}`}
                   className="text-[10px] text-solitude-text/30 uppercase tracking-[0.2em] hover:text-solitude-text/60 transition-all font-bold"
                 >
                    View Details
                 </Link>
              </div>
           </div>
        </div>

      </div>

    </motion.div>
  );
}
