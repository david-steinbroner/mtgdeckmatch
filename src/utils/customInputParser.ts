export interface ParsedCustomInput {
  vibes: string[];
  creatureTypes: string[];
  themes: string[];
  ips: string[];
  rawText: string;
}

export function parseCustomInput(text: string): ParsedCustomInput {
  const lowercaseText = text.toLowerCase();
  const vibes: string[] = [];
  const creatureTypes: string[] = [];
  const themes: string[] = [];
  const ips: string[] = [];

  // Multi-word phrase matching (check these first)
  const phrases = [
    { phrase: "rick and morty", vibe: "chaotic", theme: "sci-fi" },
    { phrase: "lord of the rings", ip: "lord_of_the_rings" },
    { phrase: "warhammer", ip: "warhammer_40k" },
    { phrase: "fallout", ip: "fallout" },
    { phrase: "post-apocalyptic", ip: "fallout" },
    { phrase: "wasteland", ip: "fallout" },
    { phrase: "walking dead", ip: "walking_dead" },
    { phrase: "negan", ip: "walking_dead" },
    { phrase: "stranger things", ip: "stranger_things" },
    { phrase: "mind flayer", ip: "stranger_things" },
    { phrase: "demogorgon", ip: "stranger_things" },
    { phrase: "transformers", ip: "transformers" },
    { phrase: "optimus", ip: "transformers" },
    { phrase: "megatron", ip: "transformers" },
    { phrase: "street fighter", ip: "street_fighter" },
    { phrase: "chun li", ip: "street_fighter" },
    { phrase: "ryu", ip: "street_fighter" },
    { phrase: "hadouken", ip: "street_fighter" },
    { phrase: "fortnite", ip: "fortnite" },
    { phrase: "battle royale", ip: "fortnite" },
    { phrase: "jurassic", ip: "jurassic_world" },
    { phrase: "jurassic park", ip: "jurassic_world" },
    { phrase: "jurassic world", ip: "jurassic_world" },
    { phrase: "dinosaur", ip: "jurassic_world" },
    { phrase: "doctor who", ip: "doctor_who" },
    { phrase: "tardis", ip: "doctor_who" },
    { phrase: "time lord", ip: "doctor_who" },
    { phrase: "monty python", ip: "monty_python" },
    { phrase: "black knight", ip: "monty_python" },
    { phrase: "holy grail", ip: "monty_python" },
    { phrase: "princess bride", ip: "princess_bride" },
    { phrase: "inigo", ip: "princess_bride" },
    { phrase: "inconceivable", ip: "princess_bride" },
    { phrase: "godzilla", ip: "godzilla" },
    { phrase: "kaiju", ip: "godzilla" },
    { phrase: "final fantasy", ip: "final_fantasy" },
  ];

  phrases.forEach(({ phrase, vibe, theme, ip }) => {
    if (lowercaseText.includes(phrase)) {
      if (vibe) vibes.push(vibe);
      if (theme) themes.push(theme);
      if (ip) ips.push(ip);
    }
  });

  // Vibe keywords
  const vibeKeywords: Record<string, string> = {
    cute: "cute",
    cuddly: "cute",
    adorable: "cute",
    fuzzy: "cute",
    creepy: "creepy",
    scary: "creepy",
    spooky: "creepy",
    dark: "creepy",
    whimsical: "whimsical",
    magical: "whimsical",
    fairy: "whimsical",
    chaos: "chaotic",
    chaotic: "chaotic",
    random: "chaotic",
    unpredictable: "chaotic",
    funny: "chaotic",
    epic: "epic",
    heroic: "epic",
    legendary: "epic",
    nature: "nature",
    wild: "nature",
    primal: "nature",
  };

  Object.entries(vibeKeywords).forEach(([keyword, vibe]) => {
    if (lowercaseText.includes(keyword) && !vibes.includes(vibe)) {
      vibes.push(vibe);
    }
  });

  // Creature type keywords
  const creatureKeywords: Record<string, string> = {
    dragon: "dragon",
    dragons: "dragon",
    elf: "elf",
    elves: "elf",
    zombie: "zombie",
    zombies: "zombie",
    vampire: "vampire",
    vampires: "vampire",
    squirrel: "squirrel",
    squirrels: "squirrel",
    cat: "cat",
    cats: "cat",
    kitty: "cat",
    kitties: "cat",
    feline: "cat",
    dog: "dog",
    dogs: "dog",
    puppy: "dog",
    puppies: "dog",
    hound: "dog",
    bear: "bear",
    bears: "bear",
    rat: "rat",
    rats: "rat",
    rodent: "rat",
    ninja: "ninja",
    ninjas: "ninja",
    pirate: "pirate",
    pirates: "pirate",
    werewolf: "werewolf",
    werewolves: "werewolf",
    wolf: "werewolf",
    wolves: "werewolf",
    phoenix: "phoenix",
    phoenixes: "phoenix",
    scarecrow: "scarecrow",
    scarecrows: "scarecrow",
    ooze: "ooze",
    oozes: "ooze",
    slime: "ooze",
    spider: "spider",
    spiders: "spider",
    arachnid: "spider",
    skeleton: "skeleton",
    skeletons: "skeleton",
    bones: "skeleton",
    clown: "performer",
    clowns: "performer",
    circus: "performer",
    performer: "performer",
    robot: "robot",
    robots: "robot",
    myr: "robot",
    construct: "robot",
    fungi: "fungus",
    fungus: "fungus",
    mushroom: "fungus",
    furby: "small creatures",
    furbies: "small creatures",
    creature: "animals",
    creatures: "animals",
    animal: "animals",
    animals: "animals",
    rabbit: "rabbit",
    rabbits: "rabbit",
    bunny: "rabbit",
    bunnies: "rabbit",
  };

  Object.entries(creatureKeywords).forEach(([keyword, type]) => {
    if (lowercaseText.includes(keyword) && !creatureTypes.includes(type)) {
      creatureTypes.push(type);
    }
  });

  // Theme keywords
  const themeKeywords: Record<string, string> = {
    tech: "artifacts",
    technology: "artifacts",
    science: "artifacts",
    artifact: "artifacts",
    artifacts: "artifacts",
    magic: "spellslinging",
    spells: "spellslinging",
    spell: "spellslinging",
    dead: "graveyard",
    graveyard: "graveyard",
    steal: "stealing",
    theft: "stealing",
    tokens: "tokens",
    token: "tokens",
    counters: "+1/+1 counters",
    enchantments: "enchantments",
    enchantment: "enchantments",
  };

  Object.entries(themeKeywords).forEach(([keyword, theme]) => {
    if (lowercaseText.includes(keyword) && !themes.includes(theme)) {
      themes.push(theme);
    }
  });

  return {
    vibes,
    creatureTypes,
    themes,
    ips,
    rawText: text,
  };
}
