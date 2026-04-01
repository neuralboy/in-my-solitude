"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, Star, Edit3, Info, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/library", label: "Library", icon: Book },
  { href: "/vault", label: "The Vault", icon: Lock },
  { href: "/desk", label: "Request Desk", icon: Edit3 },
  { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500 py-6",
      isHome ? "bg-transparent" : "bg-solitude-bg/60 backdrop-blur-xl border-b border-solitude-border"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" aria-label="In My Solitude Home">
          <div className="w-10 h-10 bg-solitude-gold/10 border border-solitude-gold/20 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
            <Star className="text-solitude-gold" size={20} fill="currentColor" aria-hidden="true" />
          </div>
          <div>
            <span className="text-lg font-serif text-white tracking-widest uppercase block leading-none mb-1">In My Solitude</span>
            <span className="text-[10px] text-solitude-gold/50 font-mono tracking-[0.3em] uppercase block leading-none">The Library</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-10" role="navigation" aria-label="Main Navigation">
          {links.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              aria-label={`Navigate to ${link.label}`}
              className={cn(
                "text-xs font-semibold uppercase tracking-widest transition-all hover:text-white",
                pathname.startsWith(link.href) ? "text-solitude-gold underline-offset-8 underline" : "text-solitude-text/50"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link 
             href="/auth/login" 
             aria-label="Enter Librarian Portal"
             className="px-5 py-2 bg-solitude-gold/5 border border-solitude-gold/20 text-solitude-gold rounded-full text-xs font-bold uppercase tracking-widest hover:bg-solitude-gold hover:text-solitude-bg transition-all"
          >
             Portal Entry
          </Link>
        </nav>

        {/* Mobile Toggle Placeholder */}
        <button className="md:hidden text-solitude-gold" aria-label="Toggle Navigation Menu">
           <Book size={24} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
