import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'gold' | 'crimson' | 'emerald' | 'blue';
}

export function StatsCard({ label, value, change, icon: Icon, trend = 'neutral', color = 'gold' }: StatsCardProps) {
  const colorStyles = {
    gold: "text-solitude-gold bg-solitude-gold/10 border-solitude-gold/20",
    crimson: "text-solitude-crimson bg-solitude-crimson/10 border-solitude-crimson/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  };

  return (
    <div className="p-6 bg-solitude-secondary/40 border border-solitude-border rounded-xl flex flex-col gap-4 group hover:border-white/10 transition-all">
       <div className="flex items-center justify-between">
          <div className={cn("w-10 h-10 flex items-center justify-center rounded-lg border", colorStyles[color])}>
             <Icon size={20} />
          </div>
          {change && (
            <span className={cn(
               "text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full border",
               trend === 'up' ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" : "text-solitude-text/30 bg-white/5 border-white/5"
            )}>
               {change}
            </span>
          )}
       </div>
       <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-solitude-text/30 font-bold block mb-1">{label}</span>
          <span className="text-3xl font-serif text-white tracking-widest">{value}</span>
       </div>
    </div>
  );
}
