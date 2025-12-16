// src/pages/start/InterestSelection.tsx
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { InterestGrid } from '@/components/start/InterestGrid';

export default function InterestSelection() {
  const location = useLocation();

  // Determine back destination based on where user came from
  const cameFromDeckFinding = location.state?.from === 'deck-finding';
  const backTo = cameFromDeckFinding ? '/start/v3/find-deck' : '/start/v3';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <Link
            to="/start/v3/about"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-sm"
          >
            <HelpCircle className="w-4 h-4" />
            What is this site?
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            What are you into?
          </h1>
          <p className="text-lg text-slate-400">
            Pick something that interests you - we'll show you what Magic has
          </p>
        </div>

        {/* Interest Grid */}
        <InterestGrid />

        {/* Footer hint */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Not seeing your thing? Magic has even more - these are just the highlights.
          </p>
        </div>
      </main>
    </div>
  );
}
