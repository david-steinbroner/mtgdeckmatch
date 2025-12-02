import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MainNav } from "@/components/MainNav";
import { DeckDetailModal } from "@/components/DeckDetailModal";
import { Target, Library, Shuffle } from "lucide-react";
import preconsData from "@/data/precons-data.json";

const PathSelection = () => {
  const navigate = useNavigate();
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [randomDeck, setRandomDeck] = useState<any | null>(null);

  const handleMatchMe = () => {
    // Go directly to vibes questions
    navigate("/vibes-questions");
  };

  const handleBrowseAll = () => {
    navigate("/browse");
  };

  const handleSurpriseMe = () => {
    // Get a random deck
    const random = preconsData[Math.floor(Math.random() * preconsData.length)];
    setRandomDeck(random);
    setShowSurpriseModal(true);
  };

  const handleTryAgain = () => {
    // Get another random deck
    const random = preconsData[Math.floor(Math.random() * preconsData.length)];
    setRandomDeck(random);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <MainNav />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Find Your Perfect Deck
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose how you want to discover your next Commander deck
            </p>
          </div>

          {/* Three Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Match Me */}
            <Card
              className="group cursor-pointer hover:shadow-card-hover transition-all duration-300 border-2 hover:border-primary/50 hover:scale-105"
              onClick={handleMatchMe}
            >
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4 h-full">
                <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-16 h-16" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Match Me
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  Answer a few questions to find your perfect match based on your playstyle and preferences
                </p>
                <Button variant="default" className="w-full">
                  Start Quiz
                </Button>
              </CardContent>
            </Card>

            {/* Browse All */}
            <Card
              className="group cursor-pointer hover:shadow-card-hover transition-all duration-300 border-2 hover:border-primary/50 hover:scale-105"
              onClick={handleBrowseAll}
            >
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4 h-full">
                <div className="text-purple-500 group-hover:scale-110 transition-transform duration-300">
                  <Library className="w-16 h-16" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Browse All
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  See all 148 decks with powerful filters for colors, themes, and strategies
                </p>
                <Button variant="outline" className="w-full">
                  View Decks
                </Button>
              </CardContent>
            </Card>

            {/* Surprise Me */}
            <Card
              className="group cursor-pointer hover:shadow-card-hover transition-all duration-300 border-2 hover:border-primary/50 hover:scale-105"
              onClick={handleSurpriseMe}
            >
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4 h-full">
                <div className="text-green-500 group-hover:scale-110 transition-transform duration-300">
                  <Shuffle className="w-16 h-16" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Surprise Me
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  Get a random deck pick and discover something unexpected
                </p>
                <Button variant="outline" className="w-full">
                  Random Deck
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bottom spacing */}
          <div className="h-8" />
        </div>
      </div>

      {/* Surprise Me Modal */}
      {randomDeck && (
        <DeckDetailModal
          deck={randomDeck}
          open={showSurpriseModal}
          onClose={() => setShowSurpriseModal(false)}
        />
      )}

      {/* Try Again Button (shown in modal footer via children) */}
      {showSurpriseModal && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            variant="secondary"
            onClick={handleTryAgain}
            className="shadow-lg"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Try Another
          </Button>
        </div>
      )}
    </div>
  );
};

export default PathSelection;
