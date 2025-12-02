// Learn Articles - Educational content for beginners

export interface ArticleSection {
  type: 'heading' | 'paragraph' | 'tip' | 'list' | 'callout';
  content: string;
  items?: string[];
  level?: 2 | 3; // for headings
}

export interface LearnArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string; // emoji
  readTime: string;
  order: number;
  category: 'getting-started' | 'understanding-decks' | 'special-topics';
  content: ArticleSection[];
}

export const learnArticles: LearnArticle[] = [
  // GETTING STARTED SECTION
  {
    id: 'what-is-magic',
    slug: 'what-is-magic',
    title: 'What is Magic: The Gathering?',
    subtitle: 'A quick introduction to the world\'s first and most popular trading card game',
    icon: '🎴',
    readTime: '2 min read',
    order: 1,
    category: 'getting-started',
    content: [
      {
        type: 'paragraph',
        content: 'Magic: The Gathering is a collectible card game created in 1993 that has grown into a worldwide phenomenon with millions of players. Think of it as a strategic battle game where you build your own army of spells and creatures to defeat your opponents.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'How Does It Work?'
      },
      {
        type: 'paragraph',
        content: 'In Magic, you\'re a powerful wizard (called a "planeswalker") who casts spells by playing cards. Each card represents a different spell, creature, or magical resource. You use these cards to reduce your opponent\'s life total from 20 (or 40 in Commander!) down to zero.'
      },
      {
        type: 'paragraph',
        content: 'The cards you choose to play together form your "deck" - kind of like building your own custom toolkit for battle. Some players love aggressive creature armies, others prefer tricky spells and combos, and still others enjoy controlling the battlefield with powerful enchantments.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Why Is It Popular?'
      },
      {
        type: 'list',
        content: 'Magic has stood the test of time for several reasons:',
        items: [
          'Deep strategy - Easy to learn basics, lifetime to master',
          'Self-expression - Build decks that match YOUR playstyle',
          'Social experience - Make friends, form communities, tell stories',
          'Constant evolution - New cards and sets released regularly',
          'Multiple ways to play - Casual kitchen table to competitive tournaments'
        ]
      },
      {
        type: 'tip',
        content: 'You don\'t need to know everything to start playing! Magic has 30+ years of cards, but you\'ll pick up what you need as you go. Start with Commander precons and learn at your own pace.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'What\'s a Format?'
      },
      {
        type: 'paragraph',
        content: 'Magic has different "formats" - basically different rule sets for how you build your deck. The most popular casual format is Commander (also called EDH), which is what this site focuses on. Commander is perfect for new players because it\'s social, creative, and welcoming to all skill levels.'
      },
      {
        type: 'callout',
        content: 'Welcome to the community! Magic players are passionate about the game and love helping newcomers. Don\'t be afraid to ask questions - everyone was a beginner once.'
      }
    ]
  },
  {
    id: 'what-is-commander',
    slug: 'what-is-commander',
    title: 'What is Commander?',
    subtitle: 'The most popular way to play Magic with friends',
    icon: '👑',
    readTime: '3 min read',
    order: 2,
    category: 'getting-started',
    content: [
      {
        type: 'paragraph',
        content: 'Commander (also called EDH, short for "Elder Dragon Highlander") is Magic\'s most popular casual format. It\'s designed for fun, social games with friends rather than competitive tournaments. Think of it as Magic\'s "party mode" - relaxed, creative, and full of memorable moments.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Basics'
      },
      {
        type: 'paragraph',
        content: 'Commander has a few key differences from other Magic formats:'
      },
      {
        type: 'list',
        content: 'Core rules:',
        items: [
          '100-card deck (no duplicates except basic lands)',
          '1 legendary creature as your "commander" who leads your deck',
          'Start with 40 life instead of 20',
          'Usually played with 4 players in a free-for-all',
          'Games last 30-90 minutes on average',
          'Your commander\'s colors determine what cards you can play'
        ]
      },
      {
        type: 'heading',
        level: 2,
        content: 'What Makes Commander Special?'
      },
      {
        type: 'paragraph',
        content: 'Commander is beloved because it encourages creativity and social interaction. Since you need 100 different cards, every deck feels unique. The multiplayer format means politics matter - you\'ll make deals, form temporary alliances, and create memorable stories at the table.'
      },
      {
        type: 'tip',
        content: 'Commander is called a "singleton" format because you can only have one copy of each card (except basic lands). This variety keeps games fresh and exciting!'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Your Commander Matters'
      },
      {
        type: 'paragraph',
        content: 'Your commander is the star of your deck. This legendary creature sits in a special "command zone" and can be cast whenever you have enough mana. If it dies or gets removed, you can cast it again from the command zone (though it costs more mana each time).'
      },
      {
        type: 'paragraph',
        content: 'Your commander\'s color identity also restricts which cards you can include. If your commander is red and green, every card in your deck must be red, green, colorless, or a mix of red and green. This creates interesting deckbuilding puzzles!'
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Social Experience'
      },
      {
        type: 'paragraph',
        content: 'What makes Commander truly special is the social dynamic. With 4 players, you can\'t just attack everyone at once. You\'ll need to:'
      },
      {
        type: 'list',
        content: '',
        items: [
          'Negotiate deals ("Don\'t attack me this turn and I won\'t counter your spell!")',
          'Form temporary alliances to take down the strongest player',
          'Read the table and decide when to make your move',
          'Enjoy the chaos and unpredictability of multiplayer'
        ]
      },
      {
        type: 'callout',
        content: 'Commander is designed to be fun first, competitive second. Most playgroups have a "Rule 0" conversation before games to align on power levels and expectations. Communication is key!'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Why Start with Commander?'
      },
      {
        type: 'paragraph',
        content: 'Commander is actually perfect for beginners despite seeming complex at first. The format is casual and forgiving, games are social and fun, and preconstructed decks let you start playing immediately without building from scratch. Plus, you can upgrade your deck gradually over time as you learn what you enjoy.'
      }
    ]
  },
  {
    id: 'what-you-need',
    slug: 'what-you-need',
    title: 'What Do I Need to Play?',
    subtitle: 'Everything required to start playing Commander (spoiler: not much!)',
    icon: '🎒',
    readTime: '2 min read',
    order: 3,
    category: 'getting-started',
    content: [
      {
        type: 'paragraph',
        content: 'Great news: you don\'t need much to start playing Commander! Unlike some hobbies that require expensive equipment or elaborate setups, Magic keeps it simple. Here\'s literally everything you need.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Essentials'
      },
      {
        type: 'paragraph',
        content: '**1. A Commander Deck**'
      },
      {
        type: 'paragraph',
        content: 'This is your 100-card deck with your commander. The easiest way to get started? Buy a preconstructed Commander deck (we call them "precons"). These ready-to-play decks cost $40-70 and come with everything you need to start playing immediately. That\'s what this entire site helps you find!'
      },
      {
        type: 'paragraph',
        content: '**2. Someone to Play With**'
      },
      {
        type: 'paragraph',
        content: 'Commander is a social game, so you\'ll need 1-3 other people (4 players total is most common). Find opponents at:'
      },
      {
        type: 'list',
        content: '',
        items: [
          'Your local game store (LGS) - Most run Commander nights',
          'Friends who already play - They\'ll help you learn!',
          'Online via SpellTable (webcam-based play)',
          'College or community groups'
        ]
      },
      {
        type: 'paragraph',
        content: '**3. A Way to Track Life Totals**'
      },
      {
        type: 'paragraph',
        content: 'You start with 40 life and need to track it as the game progresses. Options include:'
      },
      {
        type: 'list',
        content: '',
        items: [
          'Phone apps (free!) - Search "MTG life counter"',
          'Spindown d20 dice (often included with precons)',
          'Pen and paper (the classic method)',
          'Fancy life counter dice (optional but nice)'
        ]
      },
      {
        type: 'tip',
        content: 'Popular life counter apps: MTG Familiar, Lifelinker, or the official MTG Companion app. All are free and easy to use!'
      },
      {
        type: 'heading',
        level: 2,
        content: 'That\'s Actually It!'
      },
      {
        type: 'paragraph',
        content: 'Seriously. A deck, some friends, and a way to track life. You\'re ready to play! Everything else is optional.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Nice-to-Have Extras (But Not Required)'
      },
      {
        type: 'list',
        content: 'If you want to invest a bit more, these are helpful but not necessary:',
        items: [
          'Card sleeves ($5-15) - Protect your cards from wear',
          'Playmat ($15-30) - Soft surface to play on, looks cool',
          'Dice set ($5-10) - Track +1/+1 counters and other effects',
          'Deck box ($10-20) - Store and transport your deck safely'
        ]
      },
      {
        type: 'callout',
        content: 'Pro tip: If you have a friend who already plays Magic, they likely have extra sleeves, dice, and a playmat you can borrow. Don\'t buy everything at once - start simple and add accessories as needed.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Where to Buy Your First Deck'
      },
      {
        type: 'paragraph',
        content: 'Commander precons are sold at:'
      },
      {
        type: 'list',
        content: '',
        items: [
          'Local game stores (support local!)',
          'Online retailers (TCGPlayer, Amazon, Card Kingdom)',
          'Big box stores (Target, Walmart often carry them)',
          'Direct from Wizards of the Coast'
        ]
      },
      {
        type: 'paragraph',
        content: 'Prices typically range from $40-70 depending on the deck and how recent it is. Use this site to figure out which precon matches your interests, then grab it wherever is most convenient!'
      }
    ]
  },

  // UNDERSTANDING DECKS SECTION
  {
    id: 'what-is-precon',
    slug: 'what-is-precon',
    title: 'What\'s a Precon?',
    subtitle: 'Why preconstructed decks are the perfect starting point',
    icon: '📦',
    readTime: '2 min read',
    order: 4,
    category: 'understanding-decks',
    content: [
      {
        type: 'paragraph',
        content: 'A "precon" (short for preconstructed deck) is a ready-to-play Commander deck designed and sold by Wizards of the Coast, the makers of Magic. Think of it as a complete, balanced deck right out of the box - no assembly required!'
      },
      {
        type: 'heading',
        level: 2,
        content: 'What\'s Included?'
      },
      {
        type: 'paragraph',
        content: 'When you buy a Commander precon, you get:'
      },
      {
        type: 'list',
        content: '',
        items: [
          '100-card deck (fully playable immediately)',
          'Your commander (the legendary creature that leads the deck)',
          'Token cards (for creatures and effects that create tokens)',
          'Life tracker (usually a spindown d20 die)',
          'Deck box (to store your cards)',
          'Rules/strategy insert (explains how to play the deck)'
        ]
      },
      {
        type: 'tip',
        content: 'Everything you need is in the box! You can literally open it, shuffle, and start playing your first game.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Why Precons Are Great for Beginners'
      },
      {
        type: 'paragraph',
        content: '**1. No Deckbuilding Required**'
      },
      {
        type: 'paragraph',
        content: 'Building a Commander deck from scratch is fun but challenging. You need to know which cards work well together, what the right balance is, and how to build a mana base. Precons skip all that complexity so you can focus on learning how to PLAY.'
      },
      {
        type: 'paragraph',
        content: '**2. Designed to Be Balanced**'
      },
      {
        type: 'paragraph',
        content: 'Wizards designs precons to be roughly equal in power level. This means if you and your friends all buy precons, you\'ll have fair, competitive games right out of the box. No one has an overwhelming advantage.'
      },
      {
        type: 'paragraph',
        content: '**3. Built Around a Clear Theme**'
      },
      {
        type: 'paragraph',
        content: 'Every precon has a cohesive strategy and theme. Maybe it\'s all about casting powerful spells, creating an army of tokens, or drawing lots of cards. This helps you learn how different strategies work and figure out what you enjoy.'
      },
      {
        type: 'paragraph',
        content: '**4. Affordable Entry Point**'
      },
      {
        type: 'paragraph',
        content: 'At $40-70, precons are an economical way to get 100 cards including several rare and valuable ones. Building an equivalent custom deck from singles would often cost more and take much more time.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'How Often Are They Released?'
      },
      {
        type: 'paragraph',
        content: 'Wizards releases new Commander precons several times per year, usually tied to major set releases. That means there are 100+ different precons available spanning all sorts of themes, colors, and strategies. This site helps you find the one that matches YOUR interests!'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Can I Modify Them?'
      },
      {
        type: 'paragraph',
        content: 'Absolutely! Precons are designed to be played as-is, but they\'re also great foundations for customization. Many players start with a precon, play it a few times to learn it, then gradually swap in cards they like better. It\'s a natural progression.'
      },
      {
        type: 'callout',
        content: 'Precons are NOT training wheels you abandon - many experienced players buy them for the new cards, unique strategies, or just to have a balanced deck for casual games. There\'s no shame in playing a precon at any skill level!'
      }
    ]
  },
  {
    id: 'whats-in-a-deck',
    slug: 'whats-in-a-deck',
    title: 'What\'s Inside a Deck?',
    subtitle: 'Breaking down the 100 cards and what they do',
    icon: '🃏',
    readTime: '3 min read',
    order: 5,
    category: 'understanding-decks',
    content: [
      {
        type: 'paragraph',
        content: 'A Commander deck has exactly 100 cards, and understanding what types of cards you need helps demystify deckbuilding. Let\'s break down a typical deck composition.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Your Commander (1 Card)'
      },
      {
        type: 'paragraph',
        content: 'This legendary creature is the star of your deck. It sits in a special "command zone" rather than being shuffled into your library. You can cast it whenever you have enough mana, and if it leaves the battlefield, you can put it back in the command zone to cast again later (it costs 2 more generic mana each time though).'
      },
      {
        type: 'paragraph',
        content: 'Your commander\'s color identity determines what colors of cards you can include in your deck. A red and green commander means your deck can only have red, green, and colorless cards.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Lands (35-40 Cards)'
      },
      {
        type: 'paragraph',
        content: 'Lands are your mana sources - the resource you need to cast all your other spells. Most decks run about 36-38 lands, though the exact number depends on your strategy. Lands can be:'
      },
      {
        type: 'list',
        content: '',
        items: [
          'Basic lands - Forest, Mountain, Plains, Island, Swamp (tap for one color)',
          'Dual lands - Tap for two different colors',
          'Utility lands - Have special abilities beyond making mana'
        ]
      },
      {
        type: 'tip',
        content: 'Getting the right amount of each color of mana is important! If your deck is heavy red but only has 4 mountains, you\'ll struggle to cast your red spells.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Creatures (25-30 Cards)'
      },
      {
        type: 'paragraph',
        content: 'Creatures are your army. They can attack opponents, block incoming attacks, and many have useful abilities. Creature cards stay on the battlefield and can be used turn after turn until they\'re destroyed.'
      },
      {
        type: 'paragraph',
        content: 'Creatures have power (damage dealt) and toughness (damage needed to destroy them). A 3/3 creature deals 3 damage and dies after taking 3 damage.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Spells (30-35 Cards)'
      },
      {
        type: 'paragraph',
        content: 'The rest of your deck is various spell types:'
      },
      {
        type: 'paragraph',
        content: '**Instants & Sorceries** - One-time effects. Play them, they happen, then they go to your graveyard (discard pile). Instants can be played anytime, sorceries only on your turn.'
      },
      {
        type: 'paragraph',
        content: '**Artifacts** - Objects that stay on the battlefield providing ongoing benefits. Can be equipment for creatures, mana rocks that make mana, or have their own abilities.'
      },
      {
        type: 'paragraph',
        content: '**Enchantments** - Magical effects that stay on the battlefield. Some enhance your creatures, others hinder opponents, and some just provide ongoing benefits.'
      },
      {
        type: 'paragraph',
        content: '**Planeswalkers** - Powerful ally cards with multiple abilities. They\'re like additional players on your side. Opponents can attack them to remove them.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Singleton Rule'
      },
      {
        type: 'paragraph',
        content: 'Remember: except for basic lands, you can only have ONE copy of each card in your deck. This "singleton" rule is what makes Commander so varied and interesting. Every game feels different because you see different cards each time!'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Deck Categories'
      },
      {
        type: 'paragraph',
        content: 'Within your 100 cards, you\'ll want a mix of different roles:'
      },
      {
        type: 'list',
        content: '',
        items: [
          'Ramp - Cards that help you get more mana faster',
          'Card Draw - Cards that let you draw more cards to have more options',
          'Removal - Cards that destroy or exile opponent\'s threats',
          'Threats - Your big powerful cards that win you the game',
          'Protection - Cards that protect your important pieces'
        ]
      },
      {
        type: 'callout',
        content: 'A balanced deck has all these roles covered. Too much of any one thing (like 50 creatures and no removal) will leave you vulnerable. Precons do this balancing for you!'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Don\'t Memorize This!'
      },
      {
        type: 'paragraph',
        content: 'You don\'t need to memorize exact ratios or card counts. Start by playing precons and you\'ll naturally get a feel for what a good deck composition looks like. The best way to learn is by playing!'
      }
    ]
  },
  {
    id: 'changing-your-deck',
    slug: 'changing-your-deck',
    title: 'Can I Change My Deck?',
    subtitle: 'Upgrading and customizing your precon',
    icon: '✏️',
    readTime: '2 min read',
    order: 6,
    category: 'understanding-decks',
    content: [
      {
        type: 'paragraph',
        content: 'Yes! In fact, that\'s one of the best parts of Commander. Your deck can evolve over time to match your playstyle, incorporate new cards you discover, or just try out fresh strategies. There\'s no "locked" deck - it\'s always a work in progress.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Basic Rules'
      },
      {
        type: 'list',
        content: 'When customizing your deck, you must follow these guidelines:',
        items: [
          'Keep exactly 100 cards (including your commander)',
          'All cards must match your commander\'s color identity',
          'No duplicate cards except basic lands',
          'Only cards legal in Commander format (ask your playgroup if unsure)'
        ]
      },
      {
        type: 'paragraph',
        content: 'Beyond those rules, go wild! Want to swap 50 cards? Fine. Want to change just one? Also fine. Your deck, your choice.'
      },
      {
        type: 'tip',
        content: 'Try your precon unmodified for a few games first. Learn what it does, what works, and what feels weak. THEN start upgrading. You\'ll make better choices once you understand the deck.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Common First Upgrades'
      },
      {
        type: 'paragraph',
        content: '**Better Lands**'
      },
      {
        type: 'paragraph',
        content: 'Precons usually have basic mana bases. Upgrading to better dual lands that enter untapped makes your deck smoother and more consistent. This isn\'t flashy but makes a huge difference.'
      },
      {
        type: 'paragraph',
        content: '**Remove Weak Cards**'
      },
      {
        type: 'paragraph',
        content: 'Every precon has a few "filler" cards that don\'t quite fit the theme or aren\'t very powerful. As you play, you\'ll notice cards that underperform. Those are prime candidates to replace.'
      },
      {
        type: 'paragraph',
        content: '**Add Your Favorites**'
      },
      {
        type: 'paragraph',
        content: 'Found a cool creature or spell you love? Work it into your deck! Commander rewards self-expression. If you think a card is fun or fits your strategy, try it out.'
      },
      {
        type: 'paragraph',
        content: '**More Removal or Draw**'
      },
      {
        type: 'paragraph',
        content: 'Precons sometimes skimp on removal (cards that destroy threats) or card draw. Adding a few more of these improves consistency without changing the deck\'s core identity.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Budget-Friendly Options'
      },
      {
        type: 'paragraph',
        content: 'You don\'t need to spend hundreds upgrading! Many excellent Commander cards cost $1-5. Sites like EDHrec.com show popular budget upgrades for every precon. You can make meaningful improvements for $20-40 if you\'re strategic.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Talk to Your Playgroup'
      },
      {
        type: 'paragraph',
        content: 'Commander is a social format, and different groups have different expectations around deck power level. If everyone else is playing upgraded decks and you\'re on a stock precon, you might struggle. Conversely, if you build a highly optimized deck and everyone else is casual, games won\'t be fun.'
      },
      {
        type: 'callout',
        content: 'The "Rule 0" conversation: Before playing, discuss with your group what power level you\'re aiming for. This prevents feel-bad games where one deck dominates or gets crushed. Communication is key!'
      },
      {
        type: 'heading',
        level: 2,
        content: 'No Wrong Way to Build'
      },
      {
        type: 'paragraph',
        content: 'Commander is casual and creative. You can optimize for maximum power, build around a weird theme, stuff your deck with favorite cards, or anything in between. There\'s no "wrong" way as long as your playgroup is aligned.'
      },
      {
        type: 'paragraph',
        content: 'Want a deck full of dinosaurs? Cool. All the cards have "draw" in the name? Weird but go for it. Only creatures that look like they\'re having fun in the art? That\'s the Commander spirit!'
      },
      {
        type: 'tip',
        content: 'Keep your old cards! You can swap them back in anytime. Some players keep a "sideboard" of cards they rotate in and out to keep the deck fresh without buying new cards constantly.'
      }
    ]
  },

  // SPECIAL TOPICS SECTION
  {
    id: 'crossover-cards',
    slug: 'crossover-cards',
    title: 'What Are Crossover Cards?',
    subtitle: 'Universes Beyond and Secret Lair explained',
    icon: '🌟',
    readTime: '2 min read',
    order: 7,
    category: 'special-topics',
    content: [
      {
        type: 'paragraph',
        content: 'Magic has collaborated with other popular franchises to create special crossover cards and decks. These are called "Universes Beyond" products, and they\'re fully legal to play in Commander! If you love Doctor Who, Fallout, or Warhammer, you can bring those worlds into your Magic games.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'What is Universes Beyond?'
      },
      {
        type: 'paragraph',
        content: 'Universes Beyond is Wizards\' initiative to bring characters and settings from other universes into Magic. These aren\'t just themed cards with Magic mechanics - they\'re actual collaborations featuring art, names, and flavor from the original franchise.'
      },
      {
        type: 'paragraph',
        content: 'Think: playing a deck led by The Tenth Doctor, or building an army of Space Marines from Warhammer 40K, or having Frodo Baggins as your commander. Same Magic rules and gameplay, but with your favorite characters.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Full Commander Deck Sets'
      },
      {
        type: 'paragraph',
        content: 'Some Universes Beyond releases are complete Commander precon decks:'
      },
      {
        type: 'list',
        content: '',
        items: [
          'Doctor Who (4 decks)',
          'Fallout (4 decks)',
          'Warhammer 40,000 (4 decks)',
          'The Lord of the Rings (4 decks)',
          'Transformers (2 decks)',
          'Final Fantasy (1 deck)'
        ]
      },
      {
        type: 'paragraph',
        content: 'These work exactly like normal precons - 100 cards, ready to play, designed to be balanced. They just happen to star characters from other franchises!'
      },
      {
        type: 'tip',
        content: 'Universes Beyond precons are often a great entry point for fans of those franchises! If you love Fallout, the Fallout deck might be more exciting than a traditional Magic-themed deck.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'What is Secret Lair?'
      },
      {
        type: 'paragraph',
        content: 'Secret Lair is a separate product line of limited-edition card drops. These are usually small sets of alternate-art versions of existing cards with special themes. Examples include:'
      },
      {
        type: 'list',
        content: '',
        items: [
          'The Walking Dead characters',
          'Street Fighter (Ryu, Chun-Li, etc.)',
          'Stranger Things',
          'Fortnite',
          'Princess Bride',
          'Even... Furby (yes, really)'
        ]
      },
      {
        type: 'paragraph',
        content: 'Secret Lairs are collector items sold directly by Wizards for limited time windows. They\'re legal in Commander but tend to be more expensive and harder to find since they\'re limited print runs.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Are They Tournament Legal?'
      },
      {
        type: 'paragraph',
        content: 'All Universes Beyond cards are fully legal in Commander! Since Commander is a casual format, the crossover cards fit right in. (They\'re not always legal in competitive formats like Standard or Modern, but that doesn\'t affect Commander players.)'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Do I Have to Use Them?'
      },
      {
        type: 'paragraph',
        content: 'Not at all! Plenty of players prefer traditional Magic fantasy themes and never touch Universes Beyond. It\'s purely optional. But if you DO love those franchises, it\'s a fun way to blend your interests.'
      },
      {
        type: 'callout',
        content: 'Some playgroups have house rules about Universes Beyond cards, so always check with your group first. Most are fine with them, but communication prevents surprises!'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Why Do They Exist?'
      },
      {
        type: 'paragraph',
        content: 'Universes Beyond helps Magic reach new audiences. If you\'re a Doctor Who fan who has never played Magic, a Doctor Who commander deck might be your entry point. And for existing players, it adds variety and fresh themes to explore.'
      },
      {
        type: 'paragraph',
        content: 'Plus, let\'s be honest - having Optimus Prime battle against a dragon is objectively cool.'
      }
    ]
  }
];

// Helper function to get article by slug
export const getArticleBySlug = (slug: string): LearnArticle | undefined => {
  return learnArticles.find(article => article.slug === slug);
};

// Helper function to get articles by category
export const getArticlesByCategory = (category: LearnArticle['category']): LearnArticle[] => {
  return learnArticles.filter(article => article.category === category).sort((a, b) => a.order - b.order);
};

// Helper function to get all articles sorted by order
export const getAllArticles = (): LearnArticle[] => {
  return [...learnArticles].sort((a, b) => a.order - b.order);
};
