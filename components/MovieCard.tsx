"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  poster: string;
}

export default function MovieCard({ movie, onClick }: { movie: Movie, onClick: () => void }) {
  return (
    <motion.div
      layoutId={`movie-${movie.id}`}
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      className="relative group cursor-pointer"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl glass-card">
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-accent/80 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-8 h-8 fill-white" />
          </div>
        </div>
      </div>
      <h3 className="mt-4 text-center text-white/80 group-hover:text-accent font-medium text-lg transition-colors">
        {movie.title}
      </h3>
    </motion.div>
  );
}
