import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import preconsData from "@/data/precons-data.json";
import { ExternalLink } from "lucide-react";

const Results = () => {
  const navigate = useNavigate();

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
            We Found Your Perfect Decks!
          </h1>
          <p className="text-lg text-muted-foreground">
            Here are the Commander precons that match your style
          </p>
        </div>

        {/* Deck Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {preconsData.map((precon) => (
            <Card
              key={precon.id}
              className="group hover:shadow-card-hover transition-all duration-300 hover:scale-105 border-2"
            >
              <CardHeader>
                <CardTitle className="text-2xl">{precon.name}</CardTitle>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Commander: <span className="font-semibold text-foreground">{precon.commander}</span>
                  </p>
                  <div className="flex items-center gap-2">
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
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold">Set:</span> {precon.set} ({precon.year})
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Power Level:</span> {precon.tags.power_level}/10
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Complexity:</span>{" "}
                    <span className="capitalize">{precon.tags.complexity}</span>
                  </p>
                </div>

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

                <Button
                  variant="outline"
                  className="w-full group-hover:border-primary"
                  onClick={() => window.open(precon.edhrec_url, "_blank")}
                >
                  View Details
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Button variant="outline" size="lg" onClick={() => navigate("/")}>
            Start Over
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
