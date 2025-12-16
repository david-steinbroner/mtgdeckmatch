// src/data/interest-categories.ts

export interface InterestCategory {
  id: string;
  label: string;
  subtext: string;
  cardName: string;
  cardSet: string;
  scryfallUrl: string;
  artCropUrl: string;
  fallbackArtUrl?: string;
  // For matching to decks and card sets
  matchingTags: string[];
  matchingFranchises: string[];
}

export const INTEREST_CATEGORIES: InterestCategory[] = [
  {
    id: 'video-games',
    label: 'Video Games',
    subtext: 'Your favorite games, now in card form',
    cardName: 'Dogmeat, Ever Loyal',
    cardSet: 'Fallout',
    scryfallUrl: 'https://scryfall.com/card/pip/2/dogmeat-ever-loyal',
    artCropUrl: 'https://cards.scryfall.io/art_crop/front/0/5/05793fd9-02ed-4978-bc04-5319f3f20a1e.jpg',
    matchingTags: ['video-game', 'fallout', 'final-fantasy', 'street-fighter'],
    matchingFranchises: ['fallout', 'final-fantasy', 'street-fighter', 'assassins-creed']
  },
  {
    id: 'tv-movies',
    label: 'TV & Movies',
    subtext: 'From the screen to your deck',
    cardName: 'Dwight Schrute, Hay King',
    cardSet: 'Secret Lair x The Office',
    scryfallUrl: 'https://scryfall.com/card/sld/tbd/dwight-schrute-hay-king',
    // TEMP: Using Fourth Doctor until Dwight art is available (Oct 2025)
    artCropUrl: 'https://cards.scryfall.io/art_crop/front/7/e/7e6beae1-53d5-47f4-bfcd-9c2acff35baf.jpg',
    fallbackArtUrl: 'https://cards.scryfall.io/art_crop/front/7/e/7e6beae1-53d5-47f4-bfcd-9c2acff35baf.jpg',
    matchingTags: ['tv', 'movie', 'doctor-who', 'stranger-things', 'the-office'],
    matchingFranchises: ['doctor-who', 'stranger-things', 'walking-dead', 'jaws']
  },
  {
    id: 'comics-superheroes',
    label: 'Superheroes & Comics',
    subtext: 'Capes, masks, and superpowers',
    cardName: 'Deadpool, Trading Card',
    cardSet: 'Secret Lair x Marvel',
    scryfallUrl: 'https://scryfall.com/card/sld/1753/deadpool-trading-card',
    artCropUrl: 'https://cards.scryfall.io/art_crop/front/d/p/deadpool-trading-card.jpg', // TODO: Get actual URL
    matchingTags: ['superhero', 'marvel', 'comic'],
    matchingFranchises: ['marvel', 'spider-man', 'x-men', 'transformers']
  },
  {
    id: 'cute-cozy',
    label: 'Cute & Cozy',
    subtext: 'Adorable creatures and warm vibes',
    cardName: 'Mabel, Heir to Cragflame',
    cardSet: 'Bloomburrow',
    scryfallUrl: 'https://scryfall.com/card/blb/224/mabel-heir-to-cragflame',
    artCropUrl: 'https://cards.scryfall.io/art_crop/front/e/0/e0a966d0-28c4-4e6e-8aa5-879e4c9a9b0c.jpg',
    matchingTags: ['cute', 'cozy', 'wholesome', 'storybook'],
    matchingFranchises: ['bloomburrow']
  },
  {
    id: 'spooky-dark',
    label: 'Spooky & Dark',
    subtext: 'Things that go bump in the night',
    cardName: 'Sorin the Mirthless',
    cardSet: 'Innistrad: Crimson Vow',
    scryfallUrl: 'https://scryfall.com/card/vow/131/sorin-the-mirthless',
    artCropUrl: 'https://cards.scryfall.io/art_crop/front/c/c/cc7ff5f4-a7cc-41a1-a22b-8cf67ad18707.jpg',
    matchingTags: ['horror', 'dark', 'gothic', 'vampire', 'zombie'],
    matchingFranchises: ['innistrad', 'walking-dead', 'dracula']
  },
  {
    id: 'epic-fantasy',
    label: 'Epic Fantasy',
    subtext: 'Heroes, quests, and legendary tales',
    cardName: 'Frodo Baggins',
    cardSet: 'Lord of the Rings: Tales of Middle-earth',
    scryfallUrl: 'https://scryfall.com/card/ltr/205/frodo-baggins',
    artCropUrl: 'https://cards.scryfall.io/art_crop/front/0/d/0d6c8b1f-0d79-44e9-9a5c-6aa8b8c85a36.jpg',
    matchingTags: ['fantasy', 'epic', 'adventure', 'quest'],
    matchingFranchises: ['lord-of-the-rings', 'forgotten-realms', 'dnd']
  },
  {
    id: 'sci-fi-space',
    label: 'Sci-Fi & Space',
    subtext: 'The future is now',
    cardName: 'Eleven, the Mage',
    cardSet: 'Secret Lair x Stranger Things',
    scryfallUrl: 'https://scryfall.com/card/sld/343/eleven-the-mage',
    artCropUrl: 'https://cards.scryfall.io/art_crop/front/7/e/7eba1fea-6e41-49b6-8f2f-6d349209c2be.jpg',
    matchingTags: ['sci-fi', 'space', 'futuristic', 'technology'],
    matchingFranchises: ['warhammer-40k', 'stranger-things', 'transformers']
  },
  {
    id: 'animals-nature',
    label: 'Animals & Nature',
    subtext: 'Cats, dogs, and creature friends',
    cardName: 'Rin and Seri, Inseparable',
    cardSet: 'Core Set 2021',
    scryfallUrl: 'https://scryfall.com/card/m21/278/rin-and-seri-inseparable',
    artCropUrl: 'https://cards.scryfall.io/art_crop/front/d/6/d605c780-a42a-4816-8fb9-63e3114a8246.jpg',
    matchingTags: ['animal', 'nature', 'cat', 'dog', 'beast'],
    matchingFranchises: ['bloomburrow', 'jurassic-world']
  },
  {
    id: 'anime-art',
    label: 'Anime & Art Styles',
    subtext: 'Beautiful illustrated styles',
    cardName: 'Avatar Aang',
    cardSet: 'Avatar: The Last Airbender',
    scryfallUrl: 'https://scryfall.com/card/tla/207/avatar-aang-aang-master-of-elements',
    artCropUrl: 'https://cards.scryfall.io/art_crop/front/a/v/avatar-aang.jpg', // TODO: Get actual URL
    matchingTags: ['anime', 'stylized', 'japanese', 'animated'],
    matchingFranchises: ['avatar-last-airbender', 'hatsune-miku']
  },
  {
    id: 'weird-meme',
    label: 'Weird & Meme-able',
    subtext: 'Yes, this is real. Magic is wild.',
    cardName: 'Yargle, Glutton of Urborg',
    cardSet: 'Dominaria',
    scryfallUrl: 'https://scryfall.com/card/dom/113/yargle-glutton-of-urborg',
    artCropUrl: 'https://cards.scryfall.io/art_crop/front/6/4/645cfc1b-76f2-4823-9fb0-03cb009f8b32.jpg',
    matchingTags: ['weird', 'meme', 'absurd', 'funny'],
    matchingFranchises: ['furby', 'spongebob', 'un-sets']
  },
  {
    id: 'music-pop',
    label: 'Music & Pop Culture',
    subtext: 'Your favorite artists and icons',
    cardName: 'Post Malone Secret Lair',
    cardSet: 'Secret Lair x Post Malone',
    scryfallUrl: 'https://scryfall.com/card/sld/tbd/post-malone',
    artCropUrl: 'https://cards.scryfall.io/art_crop/front/placeholder.jpg', // TODO: Get actual URL
    matchingTags: ['music', 'celebrity', 'pop-culture'],
    matchingFranchises: ['post-malone', 'iron-maiden']
  },
  {
    id: 'history-mythology',
    label: 'History & Mythology',
    subtext: 'Legends from across time',
    cardName: 'Ezio Auditore da Firenze',
    cardSet: "Assassin's Creed",
    scryfallUrl: 'https://scryfall.com/card/acr/1/ezio-auditore-da-firenze',
    artCropUrl: 'https://cards.scryfall.io/art_crop/front/f/5/f5fbb8e2-1e26-4ab4-a8a7-31d28df6f2db.jpg',
    matchingTags: ['history', 'mythology', 'ancient', 'legendary'],
    matchingFranchises: ['assassins-creed', 'theros', 'kaldheim']
  }
];

// Helper to get category by ID
export function getCategoryById(id: string): InterestCategory | undefined {
  return INTEREST_CATEGORIES.find(cat => cat.id === id);
}

// Helper to get category by slug (URL-friendly)
export function getCategoryBySlug(slug: string): InterestCategory | undefined {
  return INTEREST_CATEGORIES.find(cat => cat.id === slug);
}
