import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MainNav } from "@/components/MainNav";
import { BookOpen, ArrowLeft, Sparkles } from "lucide-react";

const Learn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <MainNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <BookOpen className="w-16 h-16 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Learn Magic: The Gathering
            </h1>
            <p className="text-lg text-muted-foreground">
              Your guide to understanding Commander format and getting started
            </p>
          </div>

          {/* Coming Soon Card */}
          <Card className="border-2">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Coming Soon</h2>
              </div>

              <div className="space-y-4 text-muted-foreground">
                <p className="text-foreground font-semibold">
                  We're building a comprehensive learning center to help you:
                </p>

                <ul className="space-y-3 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong className="text-foreground">Understand the basics</strong> - Learn how Commander format works, from deck building to gameplay
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong className="text-foreground">Decode the jargon</strong> - Glossary of Magic terms like "ramp," "removal," "board wipe," and more
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong className="text-foreground">Choose your first deck</strong> - Beginner-friendly recommendations and what to look for
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong className="text-foreground">Build your skills</strong> - Strategy guides, common mistakes to avoid, and how to improve
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong className="text-foreground">Find your community</strong> - Where to play, how to find games, and Commander etiquette
                    </span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm italic">
                    In the meantime, explore our deck collection to see what Magic has to offer!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate("/discover")}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Explore Decks by Theme
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
