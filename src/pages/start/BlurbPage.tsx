// src/pages/start/BlurbPage.tsx
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Users, Gift, Gamepad2 } from 'lucide-react';

export default function BlurbPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Header */}
      <header className="max-w-3xl mx-auto px-4 py-6">
        <Link
          to="/start/v3/interests"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
          You won't believe what's in Magic
        </h1>

        <div className="prose prose-invert prose-lg mx-auto">
          <p className="text-xl text-slate-300 text-center mb-8">
            <strong className="text-amber-400">Discovering Magic</strong> helps you find your way into
            Magic: The Gathering through things you already love.
          </p>

          {/* The Problem */}
          <div className="bg-slate-800/50 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Sound familiar?
            </h2>
            <p className="text-slate-300 mb-2">
              "My friend tried to get me into Magic but I couldn't get into it."
            </p>
            <p className="text-slate-300 mb-2">
              "There are like 30,000 cards. Where do I even start?"
            </p>
            <p className="text-slate-300">
              "It seems cool but it's all wizards and goblins, not really my thing."
            </p>
          </div>

          {/* The Solution */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Here's the thing:
            </h2>
            <p className="text-slate-300 mb-4">
              Magic isn't just wizards and goblins. It has <strong className="text-amber-400">Fallout</strong>.
              It has <strong className="text-amber-400">Lord of the Rings</strong>. It has
              <strong className="text-amber-400"> Doctor Who</strong> and <strong className="text-amber-400">Stranger Things</strong>.
              It even has <strong className="text-amber-400">Furbys</strong> and <strong className="text-amber-400">SpongeBob</strong>.
            </p>
            <p className="text-slate-300">
              We show you the Magic content that matches YOUR interests, then help you find a
              ready-to-play deck so you can actually join in.
            </p>
          </div>

          {/* Who This Is For */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700">
              <Sparkles className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">The Curious</h3>
              <p className="text-sm text-slate-400">
                You've heard of Magic but never found your hook. We'll show you the cool stuff.
              </p>
            </div>
            <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700">
              <Users className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">The Recruiter</h3>
              <p className="text-sm text-slate-400">
                You play Magic and want a link to send your friends that'll actually convince them.
              </p>
            </div>
            <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700">
              <Gamepad2 className="w-8 h-8 text-emerald-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">The Newbie</h3>
              <p className="text-sm text-slate-400">
                You're sold on Magic but overwhelmed. We'll match you to your perfect first deck.
              </p>
            </div>
            <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700">
              <Gift className="w-8 h-8 text-pink-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">The Gift-Giver</h3>
              <p className="text-sm text-slate-400">
                Your friend/kid/partner plays Magic. We'll help you pick something they'll love.
              </p>
            </div>
          </div>

          {/* Not a Store */}
          <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-amber-200 mb-2">
              We're not a store
            </h3>
            <p className="text-sm text-slate-300">
              We don't sell cards. We help you discover what's out there and link you to
              places where you can buy if you want. Think of us as your friend who
              knows Magic inside and out.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/start/v3/interests"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg text-lg transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            Show Me What's Out There
          </Link>
        </div>
      </main>
    </div>
  );
}
