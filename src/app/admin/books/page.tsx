"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BookPlus, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  ShieldAlert, 
  CheckCircle2, 
  EyeOff,
  MoreVertical,
  Plus
} from "lucide-react";
import { mockBooks, mockCategories } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function BookManagerPage() {
  const [books, setBooks] = useState(mockBooks);

  const handleDelete = (id: string) => {
     if (confirm("Are you sure you want to remove this volume from the archive?")) {
        setBooks(books.filter(b => b.id !== id));
     }
  };

  return (
    <div className="space-y-12">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div className="space-y-2">
            <h1 className="text-4xl font-serif text-white tracking-widest uppercase mb-1">Book Manager</h1>
            <p className="text-solitude-text/30 text-xs font-mono uppercase tracking-[0.4em] font-bold">Maintaining the Internal Stacks and Metadata Integrity</p>
         </div>
         <div className="flex items-center gap-4">
             <div className="relative overflow-hidden bg-solitude-secondary border border-solitude-border rounded-lg px-4 py-2.5 text-solitude-text/30 focus-within:border-solitude-gold/50 transition-all flex items-center">
                <Search size={16} className="text-solitude-gold/50 mr-3" />
                <input type="text" placeholder="Search volumes..." className="bg-transparent focus:outline-none text-[10px] font-mono uppercase tracking-widest text-white w-48" />
             </div>
             <Link href="/admin/books/new" className="p-3 bg-solitude-gold text-solitude-bg rounded-lg hover:bg-white transition-all shadow-glow-gold">
                <Plus size={20} />
             </Link>
         </div>
      </header>

      {/* Book Management Grid */}
      <section className="bg-solitude-secondary/20 border border-solitude-border rounded-2xl overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
               <thead>
                  <tr className="border-b border-solitude-border bg-solitude-secondary/60 text-[10px] uppercase font-bold tracking-[0.4em] text-solitude-text/30">
                     <th className="px-6 py-5 font-bold">Volume Detail</th>
                     <th className="px-6 py-5 font-bold">Author</th>
                     <th className="px-6 py-5 font-bold">Discipline</th>
                     <th className="px-6 py-5 font-bold">Archival Date</th>
                     <th className="px-6 py-5 font-bold">Status</th>
                     <th className="px-6 py-5 text-right font-bold">Management</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-solitude-border/50">
                  {books.map((book, i) => (
                    <motion.tr 
                       key={book.id}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: i * 0.05 }}
                       className="group hover:bg-solitude-secondary/60 transition-all duration-300"
                    >
                       <td className="px-6 py-6 min-w-[300px]">
                          <div className="flex items-center gap-4">
                             <div className="relative w-12 h-16 bg-solitude-elevated border border-solitude-border rounded overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500">
                                {book.cover_url && <Image src={book.cover_url} alt={book.title} fill className="object-cover opacity-60 filter grayscale" />}
                             </div>
                             <div>
                                <h4 className="text-sm font-serif text-white tracking-widest group-hover:text-solitude-gold transition-colors">{book.title}</h4>
                                <span className="text-[9px] text-solitude-text/30 font-mono tracking-widest uppercase">ID: {book.id.slice(0, 8)}</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-6 text-[11px] text-solitude-text/60 italic font-bold">
                          {book.author || "Anonymous"}
                       </td>
                       <td className="px-6 py-6 uppercase">
                          {mockCategories.find(c => c.id === book.category_id)?.icon}
                          <span className="ml-2 text-[10px] text-solitude-text/40 font-mono tracking-widest uppercase">{mockCategories.find(c => c.id === book.category_id)?.name}</span>
                       </td>
                       <td className="px-6 py-6 text-xs text-solitude-text/30 font-mono uppercase tracking-[0.2em]">
                          {new Date(book.added_date).toLocaleDateString()}
                       </td>
                       <td className="px-6 py-6 uppercase">
                          <div className="flex flex-col gap-1.5">
                             <span className={cn(
                                "inline-flex items-center gap-1 text-[9px] font-bold tracking-[0.2em] border px-2 py-0.5 rounded",
                                book.is_published ? "text-emerald-500 bg-emerald-500/5 border-emerald-500/20" : "text-solitude-text/20 bg-white/5 border-white/5"
                             )}>
                                {book.is_published ? "Published" : "Draft"}
                             </span>
                             {book.is_restricted && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-[0.2em] border border-solitude-crimson/50 text-solitude-crimson bg-solitude-crimson/5 px-2 py-0.5 rounded">
                                   <ShieldAlert size={10} /> Vault
                                </span>
                             )}
                          </div>
                       </td>
                       <td className="px-6 py-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transform transition-transform duration-300">
                             <Link href={`/admin/books/edit/${book.id}`} className="p-2.5 bg-solitude-gold/10 border border-solitude-gold/30 text-solitude-gold rounded-lg hover:bg-solitude-gold hover:text-solitude-bg transition-all shadow-lg">
                                <Edit3 size={16} />
                             </Link>
                             <button 
                               onClick={() => handleDelete(book.id)}
                               className="p-2.5 bg-white/5 border border-white/10 text-solitude-text/40 rounded-lg hover:bg-red-950/40 hover:text-red-500 transition-all shadow-lg"
                             >
                                <Trash2 size={16} />
                             </button>
                             <button className="p-2.5 bg-solitude-secondary border border-solitude-border rounded-lg text-solitude-text/40 hover:text-white transition-all shadow-lg">
                                <MoreVertical size={16} />
                             </button>
                          </div>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>

      {/* Control Footer */}
      <footer className="footer pt-10 border-t border-solitude-border flex justify-between items-center text-[10px] text-solitude-text/20 uppercase tracking-[0.4em] font-bold font-mono">
         <span>Total Volume Manifest: {books.length} / Infinity</span>
         <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 italic font-bold">Automated Backups: Active <CheckCircle2 size={10} className="text-emerald-500" /></span>
            <span className="flex items-center gap-2 italic font-bold">Archival Sync: Confirmed <CheckCircle2 size={10} className="text-emerald-500" /></span>
         </div>
      </footer>

    </div>
  );
}
