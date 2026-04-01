import { cn } from "@/lib/utils";
import { Category } from "@/types/database";

interface CategoryBadgeProps {
  category: Pick<Category, "name" | "color" | "icon" | "slug">;
  className?: string;
  variant?: 'outline' | 'ghost' | 'solid';
}

export function CategoryBadge({ category, className, variant = 'outline' }: CategoryBadgeProps) {
  const styles = {
    outline: `border border-solitude-gold/20 text-solitude-gold/80 hover:bg-solitude-gold/10`,
    ghost: `bg-solitude-gold/5 text-solitude-gold/70`,
    solid: `bg-solitude-gold/20 text-solitude-gold`,
  };

  return (
    <span 
      className={cn(
        "px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300",
        styles[variant],
        className
      )}
      style={{
        borderLeftColor: variant === 'outline' ? category.color || undefined : undefined,
      }}
    >
      {category.icon && <span className="opacity-80 leading-none">{category.icon}</span>}
      {category.name}
    </span>
  );
}
