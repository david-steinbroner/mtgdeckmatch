import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CardImageModal } from "@/components/CardImageModal";
import preconsData from "@/data/precons-data.json";
import { matchPrecons } from "@/utils/matcher";
import { deckELI5 } from "@/utils/deckDescriptions";
import { deckDifficulty } from "@/utils/deckDifficulty";
import { getScryfallImageUrl, isPlaceholderUrl } from "@/utils/cardImageUtils";
import { ExternalLink, Sparkles } from "lucide-react";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const answers = location.state?.answers || [];
  const pathType = location.state?.path || "vibes";

  // Convert answers array to preferences object based on path
  let userPreferences = {};
  
  if (pathType === "vibes") {
    userPreferences = {
      vibe: answers.find(a => a.questionId === "vibe")?.answerId || null,
      creatureType: answers.find(a => a.questionId === "creature-types")?.answerId || null,
    };
  } else if (pathType === "power") {
    const archetypeAnswer = answers.find(a => a.questionId === "archetype")?.answerId;
    const powerLevelAnswer = answers.find(a => a.questionId === "power-level")?.answerId;
    
    // Map power level answer to range
    const powerLevelRanges: Record<string, [number, number]> = {
      "beginner": [4, 6],
      "focused": [7, 8],
      "high-power": [9, 10],
    };
    
    userPreferences = {
      archetype: archetypeAnswer || null,
      powerLevelRange: powerLevelAnswer ? powerLevelRanges[powerLevelAnswer as string] : null,
    };
  }

  // Get matched precons with path type
  const matchedResults = matchPrecons(preconsData, userPreferences, pathType);
  
  // Show only top 3 matches
  const topMatches = matchedResults.slice(0, 3);

  // Get commander card
  const getCommanderCard = (precon: any) => {
    return precon.cards?.find((card: any) => card.is_commander);
  };

  const getColorSymbol = (colorCode: string) => {
    const symbols: Record<string, string> = {
      W: "⚪",
      U: "🔵",
      B: "⚫",
      R: "🔴",
      G: "🟢",
    };
    return symbols[colorCode] || colorCode;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {topMatches.length > 0 ? "We Found Your Perfect Decks!" : "No Perfect Matches"}
          </h1>
            <p className="text-lg text-muted-foreground">
              {topMatches.length > 0 
                ? pathType === "vibes" 
                  ? "Here are the decks that match your style" 
                  : "Here are the decks that match how you like to play"
                : "But don't worry, we can help you find something great!"}
            </p>
        </div>

        {/* No Matches Message */}
        {topMatches.length === 0 && (
          <Card className="max-w-2xl mx-auto border-2 border-primary/50">
            <CardContent className="p-8 text-center space-y-4">
              <div className="text-6xl mb-4">🎴</div>
              <h3 className="text-2xl font-bold text-foreground">
                Hmm, we couldn't find a perfect match with those preferences.
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your choices or starting over to see more options!
              </p>
              <div className="flex gap-4 justify-center mt-6">
                <Button variant="hero" size="lg" onClick={() => navigate(pathType === "vibes" ? "/vibes-questions" : "/power-questions")}>
                  Adjust Preferences
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/")}>
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Deck Cards - Only show if we have matches */}
        {topMatches.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
            {topMatches.map(({ precon, score, reasons }, index) => {
              const commanderCard = getCommanderCard(precon);
              const difficultyInfo = deckDifficulty[precon.id];
              const imageUrl = commanderCard?.image_url && !isPlaceholderUrl(commanderCard.image_url)
                ? commanderCard.image_url
                : getScryfallImageUrl(precon.commander);
              
              return (
            <Card
              key={precon.id}
              className="group hover:shadow-card-hover transition-all duration-300 border-2 relative overflow-hidden flex flex-col"
            >
              {/* Best Match Badge */}
              {index === 0 && matchedResults.length > 0 && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-semibold px-3 py-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Best Match
                  </Badge>
                </div>
              )}
              
              {/* Clickable Commander Card Image */}
              {commanderCard && (
                <div className="p-4">
                  <CardImageModal
                    imageUrl={imageUrl}
                    cardName={precon.commander}
                    deckName={precon.name}
                  />
                </div>
              )}
              
              <CardHeader className="pt-4 pb-2">
                {/* Deck Name */}
                <CardTitle className="text-2xl text-foreground">{precon.name}</CardTitle>
                
                {/* Price */}
                <p className="text-sm text-muted-foreground font-semibold">
                  Typical Price: $40-60
                </p>
                
                {/* Commander Name */}
                <p className="text-sm text-muted-foreground">
                  Commander: <span className="font-semibold text-foreground">{precon.commander}</span>
                </p>
                
                {/* Colors */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">Colors:</span>
                  <div className="flex gap-1">
                    {precon.colors.map((color) => (
                      <span key={color} className="text-xl">
                        {getColorSymbol(color)}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground ml-2">
                    {precon.color_identity}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 flex-1 flex flex-col p-6">
                {/* Flavor Description */}
                {deckELI5[precon.id] && (
                  <div className="bg-secondary/20 rounded-lg p-4 border border-secondary/30">
                    <p className="text-sm text-foreground leading-relaxed">
                      {deckELI5[precon.id]}
                    </p>
                  </div>
                )}

                {/* Difficulty */}
                {difficultyInfo && (
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-semibold">Difficulty:</span> {difficultyInfo.level}/10
                    </p>
                    <p className="text-xs text-muted-foreground italic">
                      {difficultyInfo.reason}
                    </p>
                  </div>
                )}

                {/* Match Reasons - WHY IT MATCHED */}
                {reasons && reasons.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-border bg-secondary/10 -mx-6 px-6 py-4">
                    <p className="text-xs font-bold text-primary uppercase tracking-wide">Why this deck fits you:</p>
                    <ul className="space-y-1.5">
                      {reasons.map((reason, idx) => (
                        <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-accent text-lg leading-none">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags Preview */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Themes:</p>
                  <div className="flex flex-wrap gap-1">
                    {precon.tags.themes.primary.slice(0, 3).map((theme) => (
                      <span
                        key={theme}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Buttons - Always at bottom */}
                <div className="mt-auto pt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Button
                        variant="outline"
                        className="w-full group-hover:border-primary h-auto py-3"
                        onClick={() => window.open(precon.edhrec_url, "_blank")}
                      >
                        Learn More
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                      <p className="text-[10px] text-muted-foreground text-center leading-tight">
                        See full card list on EDHREC →
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Button
                        variant="default"
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-auto py-3"
                        onClick={() => {
                          const searchQuery = encodeURIComponent(precon.name + " commander deck");
                          window.open(`https://www.tcgplayer.com/search/magic/product?productLineName=magic&q=${searchQuery}&view=grid`, "_blank");
                        }}
                      >
                        Buy This Deck
                      </Button>
                      <p className="text-[10px] text-muted-foreground text-center leading-tight">
                        Purchase on TCGPlayer ($40-60) →
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
          </div>
        )}

        {/* Footer Actions - Only show if we have matches */}
        {topMatches.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button variant="outline" size="lg" onClick={() => navigate("/")}>
              Start Over
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
