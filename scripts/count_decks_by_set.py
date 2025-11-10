#!/usr/bin/env python3
import json
from collections import defaultdict

# Load the precons data
with open('src/data/precons-data.json', 'r') as f:
    decks = json.load(f)

# Group by year and set
by_year_set = defaultdict(lambda: defaultdict(list))

for deck in decks:
    year = deck.get('year')
    set_name = deck.get('set')
    name = deck.get('name')
    by_year_set[year][set_name].append(name)

# Print organized list
total = 0
for year in sorted(by_year_set.keys()):
    print(f"\n{year}:")
    for set_name in sorted(by_year_set[year].keys()):
        deck_list = by_year_set[year][set_name]
        count = len(deck_list)
        total += count
        print(f"  {set_name} ({count} decks)")
        for deck in sorted(deck_list):
            print(f"    - {deck}")

print(f"\n{'='*50}")
print(f"TOTAL: {total} decks")
