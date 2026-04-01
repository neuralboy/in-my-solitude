import Link from "next/link";
import { Star, Shield, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer bg-solitude-bg border-t border-solitude-border pt-20 pb-10 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-solitude-gold/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-32 relative z-10">
        
        {/* About Section */}
        <section className="md:col-span-5 flex flex-col gap-6">
           <div className="flex items-center gap-3">
              <Star className="text-solitude-gold" size={20} fill="currentColor" />
              <h2 className="text-xl font-serif text-white tracking-widest uppercase">In My Solitude</h2>
           </div>
           <p className="text-solitude-text/50 max-w-sm text-sm font-sans italic leading-relaxed">
             "A repository of found treasures, assembled during the quietest nights, for those 
             embarking on their own journey through the shadows of conditioning toward 
             the light of clarity."
           </p>
           <div className="flex flex-col gap-2">
             <span className="text-[10px] text-solitude-gold/50 uppercase tracking-[0.4em] font-bold">The Promise</span>
             <p className="text-xs text-solitude-text/40 font-mono">No ads. No paywalls. Built for liberation, not profit.</p>
           </div>
        </section>

        {/* Links Grid */}
        <nav className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="flex flex-col gap-6">
               <h3 className="text-[10px] text-solitude-text/40 uppercase tracking-[0.4em] font-bold">Archive</h3>
               <div className="flex flex-col gap-4 text-xs font-semibold uppercase tracking-widest">
                  <Link href="/library" className="text-solitude-text/60 hover:text-solitude-gold">The Stacks</Link>
                  <Link href="/vault" className="text-solitude-text/60 hover:text-solitude-gold flex items-center gap-2">The Vault <Shield size={12} /></Link>
                  <Link href="/desk" className="text-solitude-text/60 hover:text-solitude-gold">Request Desk</Link>
               </div>
            </div>

            <div className="flex flex-col gap-6">
               <h3 className="text-[10px] text-solitude-text/40 uppercase tracking-[0.4em] font-bold">Journey</h3>
               <div className="flex flex-col gap-4 text-xs font-semibold uppercase tracking-widest">
                  <Link href="/about" className="text-solitude-text/60 hover:text-solitude-gold">Manifesto</Link>
                  <Link href="/about#curator" className="text-solitude-text/60 hover:text-solitude-gold">The Curator</Link>
                  <Link href="/auth/register" className="text-solitude-text/60 hover:text-solitude-gold">Join Us</Link>
               </div>
            </div>

            <div className="flex flex-col gap-6">
               <h3 className="text-[10px] text-solitude-text/40 uppercase tracking-[0.4em] font-bold">Contact</h3>
               <div className="flex items-center gap-3 text-solitude-text/60 hover:text-white transition-colors">
                  <Mail size={16} className="text-solitude-gold" />
                  <span className="text-[10px] font-mono tracking-widest">EMAIL@EXAMPLE.COM</span>
               </div>
            </div>
        </nav>
      </div>

      {/* Copyright & Bottom Detail */}
      <div className="max-w-7xl mx-auto px-6 mt-32 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-white/5 pt-10 text-[10px] text-solitude-text/20 uppercase tracking-[0.4em] font-mono font-bold">
         <span>© 2024 IN MY SOLITUDE. ALL RIGHTS FREELY SHARED.</span>
         <div className="flex items-center gap-2">
            <span>OFFERED WITH</span>
            <Heart size={10} className="text-red-900 mx-2" fill="currentColor" />
            <span>BY THE CURATOR</span>
         </div>
      </div>
    </footer>
  );
}
