"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  ShieldCheck, 
  BookPlus, 
  PackageCheck, 
  HelpCircle,
  LayoutDashboard,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/vault", label: "Vault Queue", icon: ShieldCheck, badge: 3 },
  { href: "/admin/books", label: "Book Manager", icon: BookPlus },
  { href: "/admin/donations", label: "Donations", icon: PackageCheck, badge: 8 },
  { href: "/admin/requests", label: "Requests", icon: HelpCircle },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-solitude-bg border-r border-solitude-border flex flex-col fixed left-0 top-0">
      
      {/* Brand Header */}
      <div className="p-8 border-b border-solitude-border">
         <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-solitude-gold/20 border border-solitude-gold/30 flex items-center justify-center rounded-lg">
                <ShieldCheck size={18} className="text-solitude-gold" />
            </div>
            <div className="flex flex-col">
               <span className="text-xs font-serif text-white tracking-widest uppercase block leading-none mb-1">Curator</span>
               <span className="text-[10px] text-solitude-gold/50 font-mono tracking-widest uppercase block leading-none">Console</span>
            </div>
         </Link>
      </div>

      {/* Nav Section */}
      <nav className="flex-grow p-4 mt-4 space-y-1">
         <span className="px-4 py-2 text-[10px] uppercase tracking-[0.4em] font-mono text-solitude-text/20 font-bold block mb-4">Management</span>
         
         {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link 
                key={link.href}
                href={link.href}
                aria-label={`Open ${link.label} management`}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                  isActive 
                    ? "bg-solitude-gold/10 text-solitude-gold border border-solitude-gold/20" 
                    : "text-solitude-text/40 hover:text-white hover:bg-solitude-secondary/60"
                )}
              >
                <div className="flex items-center gap-3">
                   <Icon size={18} aria-hidden="true" />
                   <span>{link.label}</span>
                </div>
                {link.badge && (
                   <span 
                      className="px-1.5 py-0.5 bg-solitude-crimson/20 text-solitude-crimson border border-solitude-crimson/30 rounded text-[9px] font-mono"
                      aria-label={`${link.badge} pending items`}
                   >
                      {link.badge}
                   </span>
                )}
              </Link>
            );
         })}
      </nav>

      {/* Footer / Account */}
      <div className="p-4 border-t border-solitude-border space-y-2">
         <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-solitude-text/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold">
            <Settings size={16} />
            <span>Settings</span>
         </Link>
         <button className="w-full flex items-center gap-3 px-4 py-3 text-solitude-crimson/60 hover:text-solitude-crimson transition-colors text-[10px] uppercase tracking-widest font-bold">
            <LogOut size={16} />
            <span>Exit Console</span>
         </button>
      </div>

    </aside>
  );
}
