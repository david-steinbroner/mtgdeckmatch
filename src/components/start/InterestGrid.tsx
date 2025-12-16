// src/components/start/InterestGrid.tsx
import { Link } from 'react-router-dom';
import { Shuffle } from 'lucide-react';
import { InterestCategoryCard } from './InterestCategoryCard';
import { INTEREST_CATEGORIES } from '@/data/interest-categories';

export function InterestGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Surprise Me - Special styling */}
      <Link
        to="/start/v3/random"
        className="group relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-dashed border-amber-500/50 bg-gradient-to-br from-amber-900/20 to-amber-800/10 hover:border-amber-400 hover:bg-amber-900/30 transition-all duration-300 flex flex-col items-center justify-center"
      >
        <Shuffle className="w-10 h-10 text-amber-400 mb-2 group-hover:animate-pulse" />
        <span className="text-lg font-bold text-amber-200">Surprise Me</span>
        <span className="text-sm text-slate-400">Feeling lucky?</span>
      </Link>

      {/* Category Cards */}
      {INTEREST_CATEGORIES.map((category) => (
        <InterestCategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
