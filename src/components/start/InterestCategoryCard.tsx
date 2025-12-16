// src/components/start/InterestCategoryCard.tsx
import { Link } from 'react-router-dom';
import type { InterestCategory } from '@/data/interest-categories';

interface InterestCategoryCardProps {
  category: InterestCategory;
}

export function InterestCategoryCard({ category }: InterestCategoryCardProps) {
  return (
    <Link
      to={`/start/v3/interests/${category.id}`}
      className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${category.artCropUrl})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
          {category.label}
        </h3>
        <p className="text-sm text-slate-300 line-clamp-2">
          {category.subtext}
        </p>
      </div>

      {/* Hover indicator */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </Link>
  );
}
