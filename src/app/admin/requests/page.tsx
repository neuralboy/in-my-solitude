"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, CheckCircle2, XCircle, Search, Filter, MoreVertical, Archive } from "lucide-react";
import { cn } from "@/lib/utils";

const mockRequests = [
  { id: 'r1', user: 'Julian Sol', title: 'The Emerald Tablet', author: 'Hermes Trismegistus', why: 'Essential for the foundation of the library.', status: 'open', date: '2024-03-29' },
  { id: 'r2', user: 'Seraphina', title: 'A Dweller on Two Planets', author: 'Phylos the Tibetan', why: 'Fascinating accounts of Atlantis and Lemuria.', status: 'open', date: '2024-03-28' },
];

export default function RequestQueuePage() {
  const [requests, setRequests] = useState(mockRequests);

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div className="space-y-2">
            <h1 className="text-4xl font-serif text-white tracking-widest uppercase mb-1 text-solitude-gold">Book Requests</h1>
            <p className="text-solitude-text/30 text-xs font-mono uppercase tracking-[0.4em] font-bold">Managing User Requests for Missing Volumes in the Archive</p>
         </div>
      </header>

      {/* Requests Table */}
      <section className="bg-solitude-secondary/20 border border-solitude-border rounded-2xl overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-solitude-border bg-solitude-secondary/40 text-[10px] uppercase font-bold tracking-[0.4em] text-solitude-text/30">
                     <th className="px-6 py-5 font-bold">Solicitor</th>
                     <th className="px-6 py-5 font-bold">Recommended Volume</th>
                     <th className="px-6 py-5 font-bold">Date Logged</th>
                     <th className="px-6 py-5 font-bold">Justification</th>
                     <th className="px-6 py-5 font-bold">Status</th>
                     <th className="px-6 py-5 text-right font-bold">Management</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-solitude-border/50">
                  {requests.map((request, i) => (
                    <motion.tr 
                       key={request.id}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: i * 0.05 }}
                       className="group hover:bg-solitude-secondary/60 transition-all duration-300"
                    >
                       <td className="px-6 py-6">
                          <span className="text-sm font-serif text-white tracking-widest">{request.user}</span>
                          <span className="block text-[9px] text-solitude-text/30 font-mono italic font-bold">Verified Reader</span>
                       </td>
                       <td className="px-6 py-6 font-semibold">
                          <span className="text-xs text-white uppercase tracking-widest border-b border-white/10 pb-1">{request.title}</span>
                          <span className="block text-[10px] text-solitude-text/40 font-mono tracking-widest font-bold mt-1 uppercase">{request.author}</span>
                       </td>
                       <td className="px-6 py-6 text-xs text-solitude-text/30 font-mono uppercase tracking-widest">
                          {request.date}
                       </td>
                       <td className="px-6 py-6 max-w-sm">
                          <p className="text-xs text-solitude-text/60 italic leading-relaxed line-clamp-2">
                            "{request.why}"
                          </p>
                       </td>
                       <td className="px-6 py-6 uppercase">
                          <span className={cn(
                             "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.2em] border",
                             request.status === 'open' ? "text-solitude-gold bg-solitude-gold/5 border-solitude-gold/20" : "text-emerald-500 bg-emerald-500/5 border-emerald-500/20"
                          )}>
                             {request.status}
                          </span>
                       </td>
                       <td className="px-6 py-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transform transition-transform duration-300">
                             <button className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all shadow-lg">
                                <CheckCircle2 size={16} />
                             </button>
                             <button className="p-2.5 bg-solitude-crimson/10 border border-solitude-crimson/30 text-solitude-crimson rounded-lg hover:bg-solitude-crimson hover:text-white transition-all shadow-lg">
                                <XCircle size={16} />
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

      {requests.length === 0 && (
         <div className="flex flex-col items-center justify-center py-32 text-center bg-solitude-secondary/20 border border-solitude-border border-dashed rounded-2xl">
            <Archive size={64} className="text-solitude-border mb-6 opacity-20" />
            <h3 className="text-2xl font-serif text-solitude-text/40 mb-2 uppercase tracking-widest leading-loose">The Request Inbox is Clear</h3>
            <p className="text-xs text-solitude-text/20 max-w-sm uppercase tracking-widest leading-loose">All community requests have been reviewed and processed.</p>
         </div>
      )}

    </div>
  );
}
