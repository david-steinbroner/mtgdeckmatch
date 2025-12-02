import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MainNav } from "@/components/MainNav";
import { LearnArticleCard } from "@/components/LearnArticleCard";
import { BookOpen, Sparkles } from "lucide-react";
import { getArticlesByCategory } from "@/data/learn-articles";

const Learn = () => {
  const navigate = useNavigate();

  // Get articles by category
  const gettingStartedArticles = getArticlesByCategory('getting-started');
  const understandingDecksArticles = getArticlesByCategory('understanding-decks');
  const specialTopicsArticles = getArticlesByCategory('special-topics');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <MainNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <BookOpen className="w-16 h-16 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Learn Magic
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know to get started with Commander
            </p>
          </div>

          {/* Getting Started Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Getting Started
              </h2>
              <p className="text-muted-foreground">
                New to Magic? Start here to learn the basics
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gettingStartedArticles.map((article) => (
                <LearnArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => navigate(`/learn/${article.slug}`)}
                />
              ))}
            </div>
          </div>

          {/* Understanding Decks Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Understanding Decks
              </h2>
              <p className="text-muted-foreground">
                Learn about precons, deck construction, and customization
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {understandingDecksArticles.map((article) => (
                <LearnArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => navigate(`/learn/${article.slug}`)}
                />
              ))}
            </div>
          </div>

          {/* Special Topics Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Special Topics
              </h2>
              <p className="text-muted-foreground">
                Crossover cards and quick reference materials
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Special Topics Articles */}
              {specialTopicsArticles.map((article) => (
                <LearnArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => navigate(`/learn/${article.slug}`)}
                />
              ))}

              {/* Glossary Card */}
              <Card
                className="group cursor-pointer hover:shadow-card-hover transition-all duration-300 border-2 hover:border-primary/50 h-full bg-gradient-to-br from-primary/5 to-primary/10"
                onClick={() => navigate('/learn/glossary')}
              >
                <CardContent className="p-6 flex flex-col h-full space-y-4">
                  {/* Icon */}
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    📖
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col space-y-3">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground leading-tight">
                      Glossary
                    </h3>

                    {/* Subtitle */}
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      Quick reference for Magic terms and Commander jargon
                    </p>
                  </div>

                  {/* Badge */}
                  <div className="pt-3 border-t border-border/50">
                    <span className="text-xs font-semibold text-primary">
                      35+ Terms
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50" />

          {/* Call to Action */}
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Ready to find your deck?
              </h2>
              <p className="text-muted-foreground">
                Explore our collection of 148+ Commander decks
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                onClick={() => navigate("/play")}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Find My Perfect Deck
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/browse")}
                className="flex items-center gap-2"
              >
                Browse All Decks
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
