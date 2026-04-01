"use client";

import { motion } from "framer-motion";
import { Book as BookIcon, Download, ExternalLink } from "lucide-react";
import { Book, Category } from "@/types/database";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface BookCardProps {
  book: Book;
  category?: Category;
  className?: string;
}

export function BookCard({ book, category, className }: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className={cn(
        "group h-full flex flex-col bg-solitude-secondary border border-solitude-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]",
        className
      )}
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-solitude-elevated group-hover:after:absolute group-hover:after:inset-0 group-hover:after:bg-solitude-bg/40 group-hover:after:transition-colors group-hover:after:duration-300">
        {book.cover_url ? (
          <Image
            src={book.cover_url}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <BookIcon size={64} />
          </div>
        )}

        {/* Action Buttons Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 px-6 translate-y-4 group-hover:translate-y-0 transform transition-transform duration-300">
          <Link
            href={`/book/${book.id}`}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-solitude-gold text-solitude-bg font-semibold rounded-md transition-all hover:bg-solitude-gold/80"
          >
            <BookIcon size={16} />
            Read Online
          </Link>
          {book.file_url && (
            <button className="w-full flex items-center justify-center gap-2 px-1 py-2 bg-white/10 text-white rounded-md backdrop-blur-md hover:bg-white/20 transition-all border border-white/10">
              <Download size={16} />
              Download PDF
            </button>
          )}
        </div>

        {/* Restricted Badge */}
        {book.is_restricted && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-solitude-crimson text-white text-[10px] font-bold uppercase rounded shadow-lg z-20 flex items-center gap-1">
            <span>Vault</span>
          </div>
        )}
      </div>

      {/* Book Info Content */}
      <div className="p-5 flex flex-col flex-grow gap-3">
        {category && (
          <CategoryBadge category={category} variant="ghost" className="mb-1" />
        )}
        
        <div>
          <h3 className="font-serif text-lg leading-tight text-solitude-gold group-hover:text-white transition-colors line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-solitude-text/50 capitalize tracking-wide font-sans line-clamp-1 italic">
            {book.author || "Anonymous"}
          </p>
        </div>

        <p className="text-sm text-solitude-text/60 line-clamp-3 font-sans leading-relaxed">
          {book.description || "A volume of hidden knowledge... more context is available in the librarian's notes."}
        </p>
        
        <div className="mt-auto pt-4 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity duration-300">
           <span className="text-[10px] font-mono text-solitude-text/50 uppercase tracking-widest">
              Added: {new Date(book.added_date).toLocaleDateString()}
           </span>
           <Link href={`/book/${book.id}`} className="text-solitude-gold hover:text-white">
             <ExternalLink size={14} />
           </Link>
        </div>
      </div>
    </motion.div>
  );
}
