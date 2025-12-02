// Glossary - Magic: The Gathering terms for beginners

export interface GlossaryTerm {
  term: string;
  definition: string;
  example?: string;
  relatedTerms?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Artifact',
    definition: 'A permanent card type representing objects or equipment. Artifacts stay on the battlefield and usually have ongoing abilities or can be equipped to creatures.',
    example: 'Sol Ring is an artifact that taps for 2 colorless mana.',
    relatedTerms: ['Enchantment', 'Equipment']
  },
  {
    term: 'Board Wipe',
    definition: 'A spell that destroys or removes multiple permanents at once, often all creatures. Used to reset the battlefield when opponents get ahead.',
    example: 'Wrath of God destroys all creatures - it\'s a classic board wipe.',
    relatedTerms: ['Removal', 'Battlefield']
  },
  {
    term: 'Battlefield',
    definition: 'The zone where permanents exist during the game. Creatures, artifacts, enchantments, planeswalkers, and lands are all on the battlefield once played.',
    example: 'When a creature "enters the battlefield" (ETB), it goes from your hand to the battlefield.',
    relatedTerms: ['ETB', 'Permanent']
  },
  {
    term: 'Card Advantage',
    definition: 'Having access to more cards than your opponents, giving you more options and resources. Drawing extra cards or generating tokens creates card advantage.',
    example: 'Using a spell to draw 3 cards gives you card advantage over opponents who only drew 1.',
    relatedTerms: ['Draw', 'Card Draw']
  },
  {
    term: 'Color Identity',
    definition: 'The colors determined by mana symbols in your commander\'s casting cost and rules text. Your deck can only contain cards matching these colors.',
    example: 'A commander with red and green color identity can only have red, green, and colorless cards in the deck.',
    relatedTerms: ['Commander', 'Mana']
  },
  {
    term: 'Commander',
    definition: 'Your legendary creature that leads your deck and sits in the command zone. It can be cast from there and defines your deck\'s color identity.',
    example: 'If your commander dies, you can choose to return it to the command zone instead of your graveyard.',
    relatedTerms: ['Command Zone', 'Color Identity', 'Legendary']
  },
  {
    term: 'Command Zone',
    definition: 'A special zone where your commander starts the game and can return to if it dies or gets exiled. You can cast your commander from here.',
    example: 'Your commander stays in the command zone until you have enough mana to cast it.',
    relatedTerms: ['Commander', 'Zone']
  },
  {
    term: 'Counter',
    definition: 'Either (1) a marker placed on a card (+1/+1 counters make creatures bigger) or (2) canceling an opponent\'s spell before it resolves.',
    example: 'Putting a +1/+1 counter on your creature makes it a 3/3 instead of 2/2. Or: casting Counterspell to counter an opponent\'s spell.',
    relatedTerms: ['Removal', 'Instant']
  },
  {
    term: 'Creature',
    definition: 'A permanent card type representing beings that can attack and block. Creatures have power (attack) and toughness (defense).',
    example: 'A 3/4 creature deals 3 damage when attacking and dies after taking 4 damage.',
    relatedTerms: ['Power', 'Toughness', 'Permanent']
  },
  {
    term: 'Draw',
    definition: 'Taking the top card of your library and putting it in your hand. You draw one card at the beginning of your turn.',
    example: 'Many cards say "draw two cards" as an effect, giving you more options.',
    relatedTerms: ['Card Advantage', 'Library']
  },
  {
    term: 'Enchantment',
    definition: 'A permanent card type representing magical effects. Enchantments stay on the battlefield providing ongoing benefits.',
    example: 'Rhystic Study is an enchantment that lets you draw cards when opponents cast spells.',
    relatedTerms: ['Artifact', 'Permanent']
  },
  {
    term: 'Equipment',
    definition: 'An artifact subtype that can be attached to creatures to boost them or grant abilities. Equipment stays on the battlefield even if the equipped creature dies.',
    example: 'Lightning Greaves is equipment that gives a creature haste and shroud.',
    relatedTerms: ['Artifact', 'Creature']
  },
  {
    term: 'ETB (Enters the Battlefield)',
    definition: 'An ability that triggers when a permanent comes into play. Often shortened to "ETB."',
    example: '"When this creature enters the battlefield, draw a card" means you draw when you play it.',
    relatedTerms: ['Battlefield', 'Trigger']
  },
  {
    term: 'Exile',
    definition: 'A zone where cards go when removed from the game. Unlike the graveyard, exiled cards are much harder to get back.',
    example: 'Swords to Plowshares exiles a creature, removing it from the game entirely.',
    relatedTerms: ['Graveyard', 'Removal']
  },
  {
    term: 'Graveyard',
    definition: 'Your discard pile. Cards go here when they die, are discarded, or are destroyed. Some cards can bring things back from the graveyard.',
    example: 'When your creature dies, it goes to your graveyard. You can use reanimation spells to bring it back.',
    relatedTerms: ['Exile', 'Library']
  },
  {
    term: 'Instant',
    definition: 'A spell type that can be cast at any time, even during opponents\' turns or in response to other spells. Instants go to the graveyard after resolving.',
    example: 'Counterspell is an instant, so you can cast it on an opponent\'s turn to counter their spell.',
    relatedTerms: ['Sorcery', 'Stack']
  },
  {
    term: 'Land',
    definition: 'Cards that produce mana, the resource needed to cast spells. You can play one land per turn. Basic lands include Forest, Island, Mountain, Plains, and Swamp.',
    example: 'Tap a Forest to add one green mana to your mana pool.',
    relatedTerms: ['Mana', 'Tap']
  },
  {
    term: 'Legendary',
    definition: 'A supertype for powerful, unique cards. You can only control one copy of each legendary permanent at a time.',
    example: 'All commanders must be legendary creatures. You can\'t have two copies of the same legendary creature on your battlefield.',
    relatedTerms: ['Commander', 'Permanent']
  },
  {
    term: 'Library',
    definition: 'Your deck. Cards you haven\'t drawn yet. You draw from the top of your library. If you need to draw but can\'t, you lose the game.',
    example: 'Shuffling means randomizing the order of cards in your library.',
    relatedTerms: ['Draw', 'Graveyard']
  },
  {
    term: 'Mana',
    definition: 'The resource used to cast spells. Lands produce mana. Mana comes in five colors (white, blue, black, red, green) plus colorless.',
    example: 'A spell costing 2R requires 2 mana of any color plus 1 red mana.',
    relatedTerms: ['Land', 'Ramp', 'Color Identity']
  },
  {
    term: 'Mill',
    definition: 'Putting cards from a player\'s library directly into their graveyard without being played. Named after the card Millstone.',
    example: '"Mill three cards" means put the top 3 cards of your library into your graveyard.',
    relatedTerms: ['Library', 'Graveyard']
  },
  {
    term: 'Permanent',
    definition: 'Any card that stays on the battlefield after being played. Includes creatures, artifacts, enchantments, planeswalkers, and lands.',
    example: 'Instants and sorceries are not permanents because they go to the graveyard after resolving.',
    relatedTerms: ['Battlefield', 'Creature', 'Artifact', 'Enchantment']
  },
  {
    term: 'Planeswalker',
    definition: 'A powerful ally card type with multiple activated abilities and loyalty counters. Opponents can attack planeswalkers to remove them.',
    example: 'Activate a planeswalker\'s ability by adding or removing loyalty counters as indicated.',
    relatedTerms: ['Permanent', 'Loyalty']
  },
  {
    term: 'Precon (Preconstructed Deck)',
    definition: 'A ready-to-play Commander deck sold by Wizards of the Coast. Includes 100 cards, commander, tokens, and deck box.',
    example: 'The Fallout precons are great starting points for beginners.',
    relatedTerms: ['Commander', 'Deck']
  },
  {
    term: 'Ramp',
    definition: 'Cards or strategies that accelerate your mana production, letting you cast big spells earlier than normal.',
    example: 'Cultivate is a ramp spell - it gets you extra lands so you can play bigger threats faster.',
    relatedTerms: ['Mana', 'Land']
  },
  {
    term: 'Removal',
    definition: 'Spells that destroy, exile, or otherwise get rid of opponents\' permanents. Essential for dealing with threats.',
    example: 'Swords to Plowshares, Murder, and Beast Within are all removal spells.',
    relatedTerms: ['Board Wipe', 'Exile', 'Instant', 'Sorcery']
  },
  {
    term: 'Sacrifice',
    definition: 'Putting your own permanent into the graveyard as a cost or effect. Sacrifice gets around indestructible and some protection effects.',
    example: '"Sacrifice a creature: Draw two cards" means you put one of your creatures into your graveyard to draw.',
    relatedTerms: ['Graveyard', 'Creature']
  },
  {
    term: 'Secret Lair',
    definition: 'Limited-edition card releases featuring alternate art and special themes. Often crossovers with other franchises.',
    example: 'Secret Lair x Street Fighter featured Ryu, Chun-Li, and other fighters as Magic cards.',
    relatedTerms: ['Universes Beyond']
  },
  {
    term: 'Sorcery',
    definition: 'A spell type that can only be cast on your turn during your main phase when the stack is empty. Goes to graveyard after resolving.',
    example: 'Rampant Growth is a sorcery that searches your library for a basic land.',
    relatedTerms: ['Instant', 'Stack']
  },
  {
    term: 'Stack',
    definition: 'The zone where spells and abilities wait to resolve. Last in, first out. You can respond to things on the stack with instants.',
    example: 'Your opponent casts a creature. Before it resolves, you can cast an instant to counter it.',
    relatedTerms: ['Instant', 'Counter']
  },
  {
    term: 'Tap / Untap',
    definition: 'Rotating a card sideways (tap) to use its ability or attack. Untapped cards are rotated back upright and can be used again.',
    example: 'Tap a land to add mana to your mana pool. At the beginning of your turn, untap all your permanents.',
    relatedTerms: ['Land', 'Mana', 'Creature']
  },
  {
    term: 'Token',
    definition: 'A creature or permanent created by a spell or ability rather than being a physical card. Tokens disappear when they leave the battlefield.',
    example: 'Many spells create 1/1 Soldier tokens. These function like creatures but aren\'t cards.',
    relatedTerms: ['Creature', 'Permanent']
  },
  {
    term: 'Tutor',
    definition: 'A card that lets you search your library for a specific card and put it in your hand or onto the battlefield. Named after Demonic Tutor.',
    example: 'Using a tutor to find exactly the card you need for the current situation.',
    relatedTerms: ['Library', 'Draw']
  },
  {
    term: 'Universes Beyond',
    definition: 'Wizards of the Coast\'s product line featuring crossovers with other franchises. Includes Doctor Who, Fallout, Warhammer 40K, and more.',
    example: 'The Doctor Who Commander decks are part of Universes Beyond.',
    relatedTerms: ['Secret Lair', 'Commander']
  },
  {
    term: 'Win Condition (Wincon)',
    definition: 'Your deck\'s primary method of winning the game. Usually big threats, combos, or alternative win conditions.',
    example: 'An Eldrazi titan like Ulamog is a win condition - when you cast it, you\'re likely to win.',
    relatedTerms: ['Combo']
  }
];

// Helper function to search glossary
export const searchGlossary = (query: string): GlossaryTerm[] => {
  const lowerQuery = query.toLowerCase();
  return glossaryTerms.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery)
  );
};

// Helper function to get term by exact match
export const getTermByName = (termName: string): GlossaryTerm | undefined => {
  return glossaryTerms.find(term =>
    term.term.toLowerCase() === termName.toLowerCase()
  );
};

// Helper function to get all terms alphabetically
export const getAllTermsAlphabetically = (): GlossaryTerm[] => {
  return [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));
};

// Helper function to group terms by first letter
export const getTermsByLetter = (): Map<string, GlossaryTerm[]> => {
  const map = new Map<string, GlossaryTerm[]>();

  glossaryTerms.forEach(term => {
    const firstLetter = term.term[0].toUpperCase();
    if (!map.has(firstLetter)) {
      map.set(firstLetter, []);
    }
    map.get(firstLetter)!.push(term);
  });

  // Sort terms within each letter
  map.forEach((terms, letter) => {
    map.set(letter, terms.sort((a, b) => a.term.localeCompare(b.term)));
  });

  return map;
};
