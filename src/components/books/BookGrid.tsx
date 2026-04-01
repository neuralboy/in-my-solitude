import { Book, Category } from "@/types/database";
import { BookCard } from "./BookCard";
import { cn } from "@/lib/utils";

interface BookGridProps {
  books: Book[];
  categories: Category[];
  className?: string;
}

export function BookGrid({ books, categories, className }: BookGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10",
      className
    )}>
      {books.map((book) => {
        const category = categories.find(c => c.id === book.category_id);
        return (
          <BookCard 
            key={book.id} 
            book={book} 
            category={category} 
          />
        );
      })}
    </div>
  );
}
