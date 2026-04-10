"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "@/components/MovieCard";
import MovieModal from "@/components/MovieModal";
import { ChevronLeft, Popcorn, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoungePage() {
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("/api/movies");
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Dynamic Background Shadow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,_#1a1a2e_0%,_#0f0f0f_100%)] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 px-6 py-12 md:px-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link href="/" className="inline-flex items-center text-white/40 hover:text-accent transition-colors mb-4 gap-2">
            <ChevronLeft className="w-4 h-4" />
            <span>Go Back</span>
          </Link>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-serif text-white flex items-center gap-4"
          >
            Cinema Lounge <Popcorn className="text-accent w-8 h-8 md:w-12 md:h-12" />
          </motion.h1>
          <p className="text-white/40 mt-4 font-light tracking-wide">
            A curated playlist for Dana
          </p>
        </div>
        
        <div className="hidden md:block text-right">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-1">Now Showing</p>
          <p className="text-white/60 text-xs">A PRIVATE CINEMA JUST FOR DANA</p>
        </div>
      </header>

      {/* Movie Grid */}
      <section className="relative z-10 px-6 md:px-20 min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
            <p className="text-white/20 font-light tracking-widest">Preparing the magic...</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {movies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={() => setSelectedMovie(movie)} 
              />
            ))}
          </motion.div>
        )}
      </section>

      {/* Movie Detail Modal */}
      <MovieModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
      />

      {/* Admin Link (Subtle but Visible) */}
      <div className="relative z-10 flex justify-center pb-24 mt-20">
        <Link 
          href="/admin" 
          className="text-[10px] text-white/40 hover:text-accent transition-all duration-300 tracking-[0.3em] uppercase font-light px-6 py-2.5 border border-white/10 hover:border-accent/40 rounded-full bg-white/5 hover:bg-accent/5 backdrop-blur-md shadow-2xl"
        >
          Management Mode
        </Link>
      </div>

      {/* Decorative Gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </main>
  );
}
