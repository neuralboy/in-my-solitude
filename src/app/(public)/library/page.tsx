"use client";

import { useState } from "react";
import { BookGrid } from "@/components/books/BookGrid";
import { mockBooks, mockCategories } from "@/lib/mockData";
import { Search, Filter, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function LibraryPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = mockBooks.filter((book) => {
    const matchesCategory = activeCategory ? book.category_id === activeCategory : true;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-solitude-bg text-solitude-text pb-20">
      {/* Header / Intro Section */}
      <section className="pt-32 pb-16 px-6 border-b border-solitude-border bg-gradient-to-b from-solitude-secondary/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <span className="text-solitude-gold text-xs uppercase tracking-[0.3em] font-mono mb-3 block">
                The Archive
              </span>
              <h1 className="text-5xl md:text-6xl font-serif text-white mb-2 leading-tight">
                Open Stacks
              </h1>
              <p className="text-solitude-text/60 max-w-xl text-lg font-sans leading-relaxed">
                Freely accessible volumes of foundational knowledge. Curation without censorship.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Toolbox: Search + Filter */}
      <section className="sticky top-0 z-40 bg-solitude-bg/80 backdrop-blur-xl border-b border-solitude-border shadow-md py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            
            {/* Search Bar */}
            <div className="relative w-full lg:flex-grow max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-solitude-text/30" size={18} />
              <input 
                 type="text" 
                 placeholder="Search by title, author, subject, keyword..." 
                 className="w-full pl-12 pr-4 py-3 bg-solitude-secondary border border-solitude-border rounded-lg focus:outline-none focus:ring-2 focus:ring-solitude-gold/30 focus:border-solitude-gold/50 text-white transition-all placeholder:text-solitude-text/20 placeholder:italic"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Pills (Horizontal Scroll on Mobile) */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <button 
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                  activeCategory === null 
                    ? "bg-solitude-gold text-solitude-bg border-solitude-gold shadow-glow-gold" 
                    : "bg-solitude-secondary text-solitude-text/60 border-solitude-border hover:border-solitude-gold/30 hover:text-solitude-gold"
                }`}
              >
                All Volumes
              </button>
              {mockCategories.map((category) => (
                <button 
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border flex items-center gap-2 ${
                    activeCategory === category.id 
                      ? "bg-solitude-gold text-solitude-bg border-solitude-gold shadow-glow-gold" 
                      : "bg-solitude-secondary text-solitude-text/60 border-solitude-border hover:border-solitude-gold/30 hover:text-solitude-gold"
                  }`}
                >
                  <span className="opacity-80 leading-none">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {filteredBooks.length > 0 ? (
          <BookGrid books={filteredBooks} categories={mockCategories} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Layers size={64} className="text-solitude-border mb-6 opacity-20" />
            <h3 className="text-2xl font-serif text-solitude-gold mb-2">No volumes found in this section</h3>
            <p className="text-solitude-text/50 max-w-sm">Try expanding your search or selecting a different category pill above.</p>
          </div>
        )}

        {/* Load More Button (Mockup) */}
        {filteredBooks.length > 0 && (
          <div className="mt-20 flex justify-center">
            <button className="px-10 py-4 bg-solitude-secondary border border-solitude-border rounded-lg text-solitude-gold font-semibold uppercase tracking-widest text-xs hover:bg-solitude-elevated hover:border-solitude-gold/50 transition-all">
              Load more from the stacks
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
