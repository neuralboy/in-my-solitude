"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, XCircle, MoreVertical, Search, Filter, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { mockBooks } from "@/lib/mockData";
import { cn } from "@/lib/utils";

// Mock requests for development
const mockVaultRequests = [
  { id: 'vr1', user: 'Julian Sol', book: 'The Secret Doctrine', reason: 'I have been studying theosophy for 5 years and want to explore the original source materials for my deeper spiritual journey.', status: 'pending', date: '2024-03-28' },
  { id: 'vr2', user: 'Seraphina', book: 'The Secret Doctrine', reason: 'Curiosity regarding the esoteric origins of the universe. I find modern science too limiting.', status: 'pending', date: '2024-03-27' },
  { id: 'vr3', user: 'Atlas', book: 'Forbidden Mysteries', reason: 'Preparing a thesis on suppressed archaeology and ancient civilizations.', status: 'pending', date: '2024-03-25' },
];

export default function VaultQueuePage() {
  const [requests, setRequests] = useState(mockVaultRequests);

  const handleAction = (id: string, newStatus: string) => {
     setRequests(requests.map(r => r.id === id ? {...r, status: newStatus} : r));
  };

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div className="space-y-2">
            <h1 className="text-4xl font-serif text-white tracking-widest uppercase mb-1">Vault Queue</h1>
            <p className="text-solitude-text/30 text-xs font-mono uppercase tracking-[0.4em] font-bold">Reviewing Access Requests for Restricted Volumes</p>
         </div>
         <div className="flex items-center gap-3">
             <div className="relative group overflow-hidden bg-solitude-secondary border border-solitude-border rounded-lg px-4 py-2 text-solitude-text/30 focus-within:border-solitude-gold/50 transition-all">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search requests..." className="bg-transparent pl-8 focus:outline-none text-xs font-mono uppercase tracking-widest text-white" />
             </div>
             <button className="p-3 bg-solitude-secondary border border-solitude-border rounded-lg text-solitude-text/50 hover:text-solitude-gold transition-colors">
                <Filter size={16} />
             </button>
         </div>
      </header>

      {/* Requests Table */}
      <section className="bg-solitude-secondary/20 border border-solitude-border rounded-2xl overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-solitude-border bg-solitude-secondary/40 text-[10px] uppercase font-bold tracking-[0.4em] text-solitude-text/30">
                     <th className="px-6 py-5 font-bold">Solicitor</th>
                     <th className="px-6 py-5 font-bold">Requested Volume</th>
                     <th className="px-6 py-5 font-bold">Date Logged</th>
                     <th className="px-6 py-5 font-bold">Reasoning Index</th>
                     <th className="px-6 py-5 font-bold">Status</th>
                     <th className="px-6 py-5 text-right font-bold">Actions</th>
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
                          <span className="block text-[9px] text-solitude-text/30 font-mono italic">Verified Reader</span>
                       </td>
                       <td className="px-6 py-6 font-semibold">
                          <span className="text-xs text-solitude-gold uppercase tracking-widest border-b border-solitude-gold/10 pb-1">{request.book}</span>
                       </td>
                       <td className="px-6 py-6 text-xs text-solitude-text/40 font-mono uppercase tracking-widest">
                          {request.date}
                       </td>
                       <td className="px-6 py-6 max-w-sm">
                          <p className="text-xs text-solitude-text/60 italic leading-relaxed line-clamp-2 italic font-bold">
                            "{request.reason}"
                          </p>
                       </td>
                       <td className="px-6 py-6 uppercase">
                          <span className={cn(
                             "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.2em] border",
                             request.status === 'pending' ? "text-solitude-gold bg-solitude-gold/5 border-solitude-gold/20" : 
                             request.status === 'approved' ? "text-emerald-500 bg-emerald-500/5 border-emerald-500/20" : "text-solitude-crimson bg-solitude-crimson/5 border-solitude-crimson/20"
                          )}>
                             {request.status === 'pending' ? <Clock size={10} /> : 
                              request.status === 'approved' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                             {request.status}
                          </span>
                       </td>
                       <td className="px-6 py-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transform transition-transform duration-300">
                             <button 
                               onClick={() => handleAction(request.id, 'approved')}
                               className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all shadow-lg"
                               title="Approve Entry"
                             >
                                <CheckCircle2 size={16} />
                             </button>
                             <button 
                               onClick={() => handleAction(request.id, 'denied')}
                               className="p-2.5 bg-solitude-crimson/10 border border-solitude-crimson/30 text-solitude-crimson rounded-lg hover:bg-solitude-crimson hover:text-white transition-all shadow-lg"
                               title="Deny Entry"
                             >
                                <XCircle size={16} />
                             </button>
                             <button className="p-2.5 bg-solitude-secondary border border-solitude-border rounded-lg text-solitude-text/40 hover:text-white hover:bg-solitude-elevated transition-all shadow-lg">
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

      {/* Info Notice */}
      <div className="p-8 bg-solitude-secondary/60 border border-solitude-border rounded-2xl flex items-start gap-4">
          <AlertCircle className="text-solitude-gold shrink-0 border border-solitude-gold/20 rounded h-10 w-10 p-2" />
          <div className="space-y-2">
             <h4 className="text-xs font-serif text-white uppercase tracking-widest font-bold">Archival Security Protocol</h4>
             <p className="text-xs text-solitude-text/40 leading-relaxed font-sans italic italic font-bold max-w-2xl">
                Approving a vault request will automatically generate a signed temporary access key for the user. 
                Please ensure you have reviewed the solicitor’s reason for intent before granting admission.
             </p>
          </div>
      </div>

    </div>
  );
}
