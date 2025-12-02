import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { getAllTermsAlphabetically, searchGlossary, type GlossaryTerm } from "@/data/glossary";

export const Glossary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const allTerms = useMemo(() => getAllTermsAlphabetically(), []);

  // Filter terms based on search
  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return allTerms;
    return searchGlossary(searchQuery);
  }, [searchQuery, allTerms]);

  // Group terms by first letter for alphabetical sections
  const termsByLetter = useMemo(() => {
    const map = new Map<string, GlossaryTerm[]>();

    filteredTerms.forEach(term => {
      const firstLetter = term.term[0].toUpperCase();
      if (!map.has(firstLetter)) {
        map.set(firstLetter, []);
      }
      map.get(firstLetter)!.push(term);
    });

    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filteredTerms]);

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search terms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-6 text-base"
        />
      </div>

      {/* Results Count */}
      {searchQuery && (
        <div className="text-center text-sm text-muted-foreground">
          {filteredTerms.length === 0
            ? "No terms found"
            : `Found ${filteredTerms.length} term${filteredTerms.length === 1 ? '' : 's'}`
          }
        </div>
      )}

      {/* Glossary Terms */}
      <div className="space-y-10">
        {termsByLetter.map(([letter, terms]) => (
          <div key={letter} className="space-y-4">
            {/* Letter Header */}
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold text-primary">{letter}</h2>
              <div className="flex-1 border-t border-border" />
            </div>

            {/* Terms for this letter */}
            <div className="grid gap-4">
              {terms.map((term) => (
                <Card key={term.term} className="border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6 space-y-3">
                    {/* Term Name */}
                    <h3 className="text-xl font-bold text-foreground">
                      {term.term}
                    </h3>

                    {/* Definition */}
                    <p className="text-sm text-foreground leading-relaxed">
                      {term.definition}
                    </p>

                    {/* Example */}
                    {term.example && (
                      <div className="bg-muted/50 rounded-lg p-3 border-l-4 border-primary/50">
                        <p className="text-sm text-muted-foreground italic">
                          <span className="font-semibold text-foreground not-italic">Example:</span> {term.example}
                        </p>
                      </div>
                    )}

                    {/* Related Terms */}
                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                      <div className="pt-2 border-t border-border/50">
                        <p className="text-xs text-muted-foreground mb-2">Related terms:</p>
                        <div className="flex flex-wrap gap-2">
                          {term.relatedTerms.map((relatedTerm) => (
                            <Badge key={relatedTerm} variant="secondary" className="text-xs">
                              {relatedTerm}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredTerms.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-2">No terms found matching "{searchQuery}"</p>
          <p className="text-sm text-muted-foreground">Try a different search term</p>
        </div>
      )}
    </div>
  );
};
