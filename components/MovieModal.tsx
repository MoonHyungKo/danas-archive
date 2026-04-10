"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Film, Info } from "lucide-react";
import Image from "next/image";
import VideoPlayer from "./VideoPlayer";

interface Movie {
  id: number;
  title: string;
  director: string;
  cast: string;
  plot: string;
  poster: string;
  url: string;
}

export default function MovieModal({ movie, onClose }: { movie: Movie | null, onClose: () => void }) {
  return (
    <AnimatePresence>
      {movie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            layoutId={`movie-${movie.id}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl glass rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Poster / Video Area */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex items-center">
              <VideoPlayer url={movie.url} poster={movie.poster} />
            </div>

            {/* Info Area */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 text-accent mb-4">
                  <Film className="w-4 h-4" />
                  <span className="text-sm font-light tracking-widest uppercase">Special Feature</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-serif mb-8 text-white">
                  {movie.title}
                </h2>

                <div className="space-y-6 text-white/70">
                  <div className="flex items-start gap-4">
                    <Info className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-white/40 mb-1">Director</p>
                      <p className="text-lg">{movie.director}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <User className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-white/40 mb-1">Cast</p>
                      <p className="text-lg">{movie.cast}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-white/40 mb-3">Synopsis</p>
                    <p className="text-lg leading-relaxed font-light italic">
                      "{movie.plot}"
                    </p>
                  </div>
                </div>

                <div className="mt-12">
                  <p className="text-accent text-sm font-medium animate-pulse">
                    ❤️ Have a wonderful time with Dana
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
