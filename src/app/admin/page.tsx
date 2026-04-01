"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  ShieldCheck, 
  BookPlus, 
  PackageCheck, 
  HelpCircle,
  Users,
  Eye,
  ArrowUpRight,
  Plus
} from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { mockBooks } from "@/lib/mockData";
import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Archive", value: mockBooks.length, change: "+3 this week", icon: BookPlus, trend: 'up' as const },
    { label: "Vault Requests", value: "03", change: "PENDING", icon: ShieldCheck, color: 'crimson' as const },
    { label: "Donations", value: "08", change: "REVIEW", icon: PackageCheck, color: 'emerald' as const },
    { label: "Total Views", value: "1,240", change: "+12%", icon: BarChart3, trend: 'up' as const, color: 'blue' as const },
  ];

  return (
    <div className="space-y-12">
      
      {/* Welcome Header */}
      <header className="flex items-end justify-between">
         <div className="space-y-2">
            <h1 className="text-4xl font-serif text-white tracking-widest uppercase mb-1">Archive Overview</h1>
            <p className="text-solitude-text/30 text-xs font-mono uppercase tracking-[0.4em] font-bold">Curator Session Active — Sun, March 29</p>
         </div>
         <Link href="/admin/books/new" className="flex items-center gap-2 px-6 py-2.5 bg-solitude-gold text-solitude-bg text-xs font-bold uppercase tracking-widest rounded transition-all hover:bg-white">
            <Plus size={16} />
            Archival Entry
         </Link>
      </header>

      {/* Grid: Main Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
         {stats.map((stat, i) => (
            <motion.div
               key={stat.label}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
            >
               <StatsCard {...stat} />
            </motion.div>
         ))}
      </section>

      {/* Main Content Area: Activity vs Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         
         {/* Activities Feed */}
         <section className="lg:col-span-8 space-y-6">
            <h2 className="text-[10px] text-solitude-gold uppercase tracking-[0.4em] font-bold border-b border-solitude-border pb-4">Recent Archival Activity</h2>
            <div className="space-y-1">
               {mockBooks.slice(0, 5).map((book, i) => (
                  <div key={book.id} className="group flex items-center justify-between p-4 hover:bg-solitude-secondary/60 rounded-xl transition-all border border-transparent hover:border-solitude-border">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-solitude-secondary border border-solitude-border rounded flex items-center justify-center text-solitude-text/20">
                           <Eye size={18} />
                        </div>
                        <div>
                           <h4 className="text-sm font-semibold text-white group-hover:text-solitude-gold transition-colors">{book.title}</h4>
                           <span className="text-[10px] text-solitude-text/30 uppercase tracking-widest font-mono">Viewed {book.views} times — {book.author}</span>
                        </div>
                     </div>
                     <ArrowUpRight size={14} className="text-solitude-text/20 group-hover:text-solitude-gold transition-colors" />
                  </div>
               ))}
            </div>
            <button className="w-full py-4 text-[10px] text-solitude-text/20 uppercase tracking-[0.4em] font-bold hover:text-white transition-colors">
               View All System Logs
            </button>
         </section>

         {/* Tasks / Requests Sidebar */}
         <aside className="lg:col-span-4 space-y-8">
            <div className="p-8 bg-solitude-secondary border border-solitude-border rounded-2xl space-y-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-solitude-crimson/5 blur-2xl group-hover:bg-solitude-crimson/10 transition-colors pointer-events-none" />
               <h3 className="text-xs font-serif text-white uppercase tracking-widest flex items-center gap-3">
                  <ShieldCheck size={16} className="text-solitude-crimson" />
                  Urgent Actions
               </h3>
               
               <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                     <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest">
                        <span className="text-solitude-text/30">Vault Access</span>
                        <span className="text-solitude-crimson">3 Pending</span>
                     </div>
                     <Link href="/admin/vault" className="text-xs text-solitude-text/60 hover:text-white transition-colors italic leading-relaxed">
                        Request for "The Secret Doctrine" — Review Required.
                     </Link>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                     <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest">
                        <span className="text-solitude-text/30">Community Donations</span>
                        <span className="text-emerald-500">8 Pending</span>
                     </div>
                     <Link href="/admin/donations" className="text-xs text-solitude-text/60 hover:text-white transition-colors italic leading-relaxed">
                        User submitted a scan of "Real History".
                     </Link>
                  </div>
               </div>
               
               <div className="h-px bg-solitude-border" />
               <p className="text-[10px] text-solitude-text/30 italic uppercase tracking-widest leading-relaxed">
                  Curation priority is automated based on metadata sensitivity.
               </p>
            </div>
         </aside>

      </div>

    </div>
  );
}
