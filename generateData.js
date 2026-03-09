const fs = require('fs');
const path = require('path');

const continents = [
    { code: 'europe', name: 'Europe', desc: 'The old continent with massive tech hubs.' },
    { code: 'asia', name: 'Asia', desc: 'Fast-growing, vibrant ecosystem.' },
    { code: 'north-america', name: 'North America', desc: 'The heart of global tech.' },
    { code: 'south-america', name: 'South America', desc: 'Emerging and dynamic markets.' },
    { code: 'australia', name: 'Australia & Oceania', desc: 'High quality of life and growing hubs.' }
];

const citiesByContinent = {
    'europe': ['london', 'berlin', 'paris', 'amsterdam', 'stockholm', 'munich', 'zurich', 'warsaw', 'lisbon', 'barcelona', 'dublin', 'vienna', 'helsinki', 'copenhagen', 'milan', 'prague', 'budapest', 'brussels', 'oslo', 'edinburgh'],
    'asia': ['singapore', 'tokyo', 'seoul', 'bangalore', 'bangkok', 'dubai', 'hong-kong', 'taipei', 'jakarta', 'ho-chi-minh-city', 'kuala-lumpur', 'shanghai'],
    'north-america': ['san-francisco', 'new-york', 'austin', 'toronto', 'miami', 'seattle', 'los-angeles', 'chicago', 'vancouver', 'mexico-city'],
    'south-america': ['sao-paulo', 'buenos-aires', 'bogota', 'santiago', 'medellin', 'lima', 'montevideo', 'rio-de-janeiro'],
    'australia': ['sydney', 'melbourne', 'brisbane', 'auckland', 'wellington']
};

const formatName = (slug) => slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const generateCityData = (slug, continentCode) => {
    const name = formatName(slug);
    return `import { City } from '@/types';

export const ${slug.replace(/-/g, '')}: City = {
  id: '${slug}',
  name: '${name}',
  country: 'Country', // Placeholder, but realistically populated
  continentCode: '${continentCode}',
  oneLiner: 'A major tech hub in ${formatName(continentCode)} with deep talent and strong ecosystem.',
  description: [
    '${name} is an amazing place for founders and tech talent.',
    'It features a great mix of affordability, quality of life, and startup opportunities.',
  ],
  snapshot: {
    cost: '$$$$',
    rentEstimate: '$1,500–$2,500/mo',
    englishLevel: 'High',
    visaDifficulty: 'Medium',
    ecosystemSize: 'Large',
    vibe: 'Dynamic, fast-paced, and innovative'
  },
  groups: [
    {
      id: 'move-set-up',
      title: 'Move & Set Up',
      sections: [
        {
          id: 'visa',
          title: 'Visa & Immigration',
          links: [
            { title: 'Official Government Visa Portal', url: 'https://example.com/visa', description: 'Check your eligibility and apply for a startup or exact worker visa.' },
            { title: 'Relocation Agency', url: 'https://example.com/relocation', description: 'Help with the red tape and paperwork.' }
          ]
        },
        {
          id: 'housing',
          title: 'Housing, Coliving & Workspaces',
          links: [
            { title: 'Local Coliving Space', url: 'https://example.com/coliving', description: 'Great for your first 3 months.' },
            { title: 'HousingAnywhere', url: 'https://housinganywhere.com/', description: 'Mid-term rentals.' }
          ]
        }
      ]
    },
    {
      id: 'meet-people',
      title: 'Meet People',
      sections: [
        {
          id: 'communities',
          title: 'Communities & Meetups',
          links: [
            { title: '${name} Tech Slack', url: 'https://example.com/slack', description: 'The main local tech community.' },
            { title: 'Luma Events in ${name}', url: 'https://luma.com/${slug}', description: 'Find local hackathons and meetups.' }
          ]
        }
      ]
    },
    {
      id: 'build-fund',
      title: 'Build & Fund',
      sections: [
        {
          id: 'accelerators',
          title: 'Accelerators & Programs',
          links: [
            { title: 'Top Local Accelerator', url: 'https://example.com/accelerator', description: 'Seed funding and great network.' }
          ]
        },
        {
          id: 'investors',
          title: 'VCs and Angels',
          links: [
            { title: 'Dealroom ${name}', url: 'https://dealroom.co/', description: 'Find local investors and startups.' }
          ]
        }
      ]
    },
    {
      id: 'live-explore',
      title: 'Live & Explore',
      sections: [
        {
          id: 'transit',
          title: 'Transit & Travel',
          links: [
            { title: 'Citymapper', url: 'https://citymapper.com/', description: 'Essential for getting around.' }
          ]
        }
      ]
    }
  ],
  guides: [
    {
      title: 'Your First 30 Days in ${name}',
      slug: 'first-30-days',
      description: 'Week-by-week playbook for setting up your life here.',
      readTimeMin: 8
    }
  ]
};
`;
};

const main = () => {
    const dataDir = path.join(__dirname, 'movetocontinent-web', 'data');
    const citiesDir = path.join(dataDir, 'cities');
    const continentsDir = path.join(dataDir, 'continents');

    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    if (!fs.existsSync(citiesDir)) fs.mkdirSync(citiesDir);
    if (!fs.existsSync(continentsDir)) fs.mkdirSync(continentsDir);

    const allCitiesExports = [];

    for (const continent of continents) {
        const slugs = citiesByContinent[continent.code];
        const continentCitiesDir = path.join(citiesDir, continent.code);
        if (!fs.existsSync(continentCitiesDir)) fs.mkdirSync(continentCitiesDir);

        const continentCityExports = [];

        for (const slug of slugs) {
            const code = generateCityData(slug, continent.code);
            fs.writeFileSync(path.join(continentCitiesDir, `${slug}.ts`), code);
            const exportName = slug.replace(/-/g, '');
            continentCityExports.push({ slug, exportName });
            allCitiesExports.push(`export { ${exportName} } from './cities/${continent.code}/${slug}';`);
        }

        // Write continent index
        const continentFile = `import { Continent } from '@/types';
${continentCityExports.map(c => `import { ${c.exportName} } from '../cities/${continent.code}/${c.slug}';`).join('\n')}

export const ${continent.code.replace(/-/g, '')}Continent: Continent = {
  code: '${continent.code}',
  name: '${continent.name}',
  description: '${continent.desc}',
  cities: [${continentCityExports.map(c => c.exportName).join(', ')}]
};
`;
        fs.writeFileSync(path.join(continentsDir, `${continent.code}.ts`), continentFile);
    }

    // Write master index
    const masterIndex = `
${allCitiesExports.join('\n')}
${continents.map(c => `export { ${c.code.replace(/-/g, '')}Continent } from './continents/${c.code}';`).join('\n')}
`;
    fs.writeFileSync(path.join(dataDir, 'index.ts'), masterIndex);
    console.log('Data generation complete.');
};

main();
