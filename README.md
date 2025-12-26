# Discovering Magic 🎴

> Help people discover Magic: The Gathering through things they already love.

**Live site:** [discoveringmagic.com](https://discoveringmagic.com)

-----

## What is this?

Discovering Magic is a discovery platform that connects people’s existing interests to Magic: The Gathering products. Instead of overwhelming newcomers with 30 years of cards and jargon, we ask one question: **“What are you already into?”**

Then we show them the Fallout deck. The Doctor Who cards. The Furby. The SpongeBob crossover.

The “holy shit, Magic has THAT?!” moment — bottled into a website.

-----

## The Problem

People don’t bounce off Magic because they hate it. They bounce because nothing connected to something they already cared about.

Traditional entry points assume you already care about Magic. We don’t.

-----

## Who It’s For

|Audience               |What they need                                                               |
|-----------------------|-----------------------------------------------------------------------------|
|**Bounced-off players**|“My friend tried to get me into Magic but…” — Show them their hook           |
|**Recruiters**         |Magic players who want to convert their friends — Give them a link to send   |
|**New players**        |Already sold, just overwhelmed — Match them to their first deck in 60 seconds|
|**Gift buyers**        |Zero Magic knowledge — Guide them to a safe purchase                         |

-----

## Features

- **START Flow** — Fork between “never played” and “played before” for tailored paths
- **12 Interest Categories** — Video games, anime, cute animals, horror, superheroes, etc.
- **Deck Quiz** — Art-focused or gameplay-focused matching in under a minute
- **148 Commander Precons** — Full catalog with beginner-friendly descriptions
- **Card Set Showcase** — Universes Beyond crossovers and Secret Lairs
- **Learn Section** — Jargon-free education for total beginners
- **Browse & Filter** — For people who know what they want

-----

## Tech Stack

|Layer         |Tech                                     |
|--------------|-----------------------------------------|
|Framework     |React 18 + TypeScript                    |
|Build         |Vite                                     |
|UI            |shadcn/ui + Radix UI                     |
|Styling       |Tailwind CSS                             |
|Routing       |React Router v6                          |
|State         |React Context, sessionStorage, URL params|
|Data          |TanStack Query, Scryfall API             |
|Analytics     |PostHog                                  |
|Error Tracking|Sentry                                   |
|Hosting       |Cloudflare Pages                         |

-----

## Local Development

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/discovering-magic.git
cd discovering-magic

# Install dependencies
npm install

# Start dev server
npm run dev
```

Requires Node.js 18+ (recommend using [nvm](https://github.com/nvm-sh/nvm))

-----

## Project Structure

```
src/
├── components/
│   ├── start/           # START flow v3 components
│   ├── MainNav.tsx      # Site navigation
│   ├── DeckCard.tsx     # Deck preview cards
│   └── ...
├── pages/
│   ├── start/           # START flow pages
│   ├── Home.tsx         # Homepage
│   ├── Discover.tsx     # Theme browsing
│   ├── Browse.tsx       # All decks with filters
│   └── ...
├── data/
│   ├── precons-data.json       # 148 Commander decks
│   ├── card-sets.json          # Universes Beyond sets
│   ├── interest-categories.ts  # START flow categories
│   └── ...
├── hooks/               # Custom React hooks
├── contexts/            # React Context providers
└── lib/                 # Utilities
```

-----

## Key Data Files

|File                    |What it contains                                     |
|------------------------|-----------------------------------------------------|
|`precons-data.json`     |All Commander precon decks with comprehensive tagging|
|`card-sets.json`        |~30 Universes Beyond and Secret Lair sets            |
|`interest-categories.ts`|12 interests with matching logic                     |
|`themes.json`           |Discover page theme definitions                      |
|`learn-articles.ts`     |Educational content                                  |
|`glossary.ts`           |35+ beginner-friendly term definitions               |

-----

## Deployment

**Production:** Cloudflare Pages auto-deploys from `main` branch

**Preview:** Push to any branch for automatic preview deployment

-----

## Documentation

- [SITE_BIBLE.md](./SITE_BIBLE.md) — Full product reference and vision
- [SITE_BIBLE-3.md](./SITE_BIBLE-3.md) — Updated bible with v3 START flow details

-----

## Contributing

This is primarily a solo portfolio project, but feedback is welcome:

1. Open an issue for bugs or suggestions
1. Check existing issues before creating new ones
1. PRs welcome for typos, broken links, or data corrections

-----

## License

MIT

-----

## About

Built by [David](https://github.com/YOUR_USERNAME) as both a passion project and PM portfolio piece.

The goal: solve a real problem I observed in the Magic community while demonstrating product thinking, user research, and shipping discipline.

Questions? [Open an issue](https://github.com/YOUR_USERNAME/discovering-magic/issues) or reach out.