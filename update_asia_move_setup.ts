import * as fs from 'fs';
import * as path from 'path';

interface LinkEntry {
  title: string;
  url: string;
}

interface CityData {
  visa: LinkEntry;
  housing: LinkEntry[];
  company: LinkEntry[];
}

const cityDataMap: Record<string, CityData> = {
  singapore: {
    visa: { title: 'Ministry of Manpower (MOM)', url: 'https://www.mom.gov.sg/passes-and-permits' },
    housing: [
      { title: 'PropertyGuru', url: 'https://www.propertyguru.com.sg/' },
      { title: '99.co', url: 'https://www.99.co/' },
      { title: 'HousingAnywhere', url: 'https://housinganywhere.com/' },
    ],
    company: [
      { title: 'ACRA BizFile+', url: 'https://www.bizfile.gov.sg/' },
      { title: 'Osome Singapore', url: 'https://osome.com/sg/' },
    ],
  },
  tokyo: {
    visa: { title: 'Japan Startup Visa', url: 'https://www.jetro.go.jp/en/invest/investment_environment/visa.html' },
    housing: [
      { title: 'SUUMO', url: 'https://suumo.jp/en/' },
      { title: 'GaijinPot Housing', url: 'https://housing.gaijinpot.com/' },
      { title: 'HousingAnywhere', url: 'https://housinganywhere.com/' },
    ],
    company: [
      { title: 'JETRO Invest Japan', url: 'https://www.jetro.go.jp/en/invest/setting_up/' },
    ],
  },
  seoul: {
    visa: { title: 'OASIS Startup Visa (D-8-4)', url: 'https://www.oasisvisa.com/' },
    housing: [
      { title: 'Craigslist Seoul', url: 'https://seoul.craigslist.org/' },
      { title: 'HousingAnywhere', url: 'https://housinganywhere.com/' },
    ],
    company: [
      { title: 'Invest Korea', url: 'https://www.investkorea.org/' },
    ],
  },
  bangalore: {
    visa: { title: 'India e-Visa Portal', url: 'https://indianvisaonline.gov.in/evisa/tvoa.html' },
    housing: [
      { title: 'MagicBricks', url: 'https://www.magicbricks.com/' },
      { title: 'NoBroker', url: 'https://www.nobroker.in/' },
    ],
    company: [
      { title: 'Startup India', url: 'https://www.startupindia.gov.in/' },
    ],
  },
  bangkok: {
    visa: { title: 'SMART Visa Thailand', url: 'https://smart-visa.boi.go.th/' },
    housing: [
      { title: 'DDProperty', url: 'https://www.ddproperty.com/' },
      { title: 'FazWaz', url: 'https://www.fazwaz.com/' },
    ],
    company: [
      { title: 'Thailand BOI', url: 'https://www.boi.go.th/' },
    ],
  },
  dubai: {
    visa: { title: 'Dubai Virtual Working Program', url: 'https://www.visitdubai.com/en/invest-in-dubai/live-and-work/visas-and-entry/virtual-working-programme' },
    housing: [
      { title: 'PropertyFinder', url: 'https://www.propertyfinder.ae/' },
      { title: 'Bayut', url: 'https://www.bayut.com/' },
    ],
    company: [
      { title: 'Dubai Multi Commodities Centre (DMCC)', url: 'https://www.dmcc.ae/' },
    ],
  },
  'hong-kong': {
    visa: { title: 'HK TechTAS', url: 'https://www.itc.gov.hk/en/fund_app/techtas/index.html' },
    housing: [
      { title: '28Hse', url: 'https://www.28hse.com/en/' },
      { title: 'Spacious', url: 'https://www.spacious.hk/' },
    ],
    company: [
      { title: 'InvestHK', url: 'https://www.investhk.gov.hk/' },
    ],
  },
  taipei: {
    visa: { title: 'Taiwan Gold Card', url: 'https://taiwangoldcard.ndc.gov.tw/' },
    housing: [
      { title: '591 Housing', url: 'https://www.591.com.tw/' },
      { title: 'MyRoomAbroad', url: 'https://myroomabroad.com/' },
    ],
    company: [
      { title: 'Startup Island TAIWAN', url: 'https://www.startupislandtaiwan.info/' },
    ],
  },
  jakarta: {
    visa: { title: 'Indonesia Expatriate Visas (Imigrasi)', url: 'https://www.imigrasi.go.id/' },
    housing: [
      { title: 'Rumah123', url: 'https://www.rumah123.com/' },
      { title: 'Travelio', url: 'https://www.travelio.com/' },
    ],
    company: [
      { title: 'BKPM (Indonesia Invest Board)', url: 'https://www.bkpm.go.id/' },
    ],
  },
  'ho-chi-minh-city': {
    visa: { title: 'Vietnam e-Visa', url: 'https://evisa.xuatnhapcanh.gov.vn/' },
    housing: [
      { title: 'Batdongsan', url: 'https://batdongsan.com.vn/en' },
      { title: 'ChoTot', url: 'https://www.chotot.com/' },
    ],
    company: [
      { title: 'Cekindo Vietnam', url: 'https://www.cekindo.vn/' },
    ],
  },
  'kuala-lumpur': {
    visa: { title: 'Malaysia Tech Entrepreneur Programme (MTEP)', url: 'https://mdec.my/mtep/' },
    housing: [
      { title: 'iProperty Malaysia', url: 'https://www.iproperty.com.my/' },
      { title: 'PropertyGuru Malaysia', url: 'https://www.propertyguru.com.my/' },
    ],
    company: [
      { title: 'MDEC', url: 'https://mdec.my/' },
    ],
  },
  shanghai: {
    visa: { title: 'China National Immigration Administration', url: 'https://en.nia.gov.cn/' },
    housing: [
      { title: 'Ziroom', url: 'https://www.ziroom.com/' },
      { title: 'Wellcee', url: 'https://www.wellcee.com/' },
    ],
    company: [
      { title: 'Shanghai Invest', url: 'https://www.investsh.org.cn/' },
    ],
  },
  beijing: {
    visa: { title: 'China National Immigration Administration', url: 'https://en.nia.gov.cn/' },
    housing: [
      { title: 'Ziroom', url: 'https://www.ziroom.com/' },
      { title: 'Wellcee', url: 'https://www.wellcee.com/' },
    ],
    company: [
      { title: 'Invest Beijing', url: 'http://english.beijing.gov.cn/' },
    ],
  },
  manila: {
    visa: { title: 'Philippine Bureau of Immigration', url: 'https://immigration.gov.ph/' },
    housing: [
      { title: 'Lamudi Philippines', url: 'https://www.lamudi.com.ph/' },
      { title: 'Rentpad', url: 'https://rentpad.ph/' },
    ],
    company: [
      { title: 'Board of Investments (BOI) Philippines', url: 'https://boi.gov.ph/' },
    ],
  },
  mumbai: {
    visa: { title: 'India e-Visa Portal', url: 'https://indianvisaonline.gov.in/evisa/tvoa.html' },
    housing: [
      { title: 'MagicBricks', url: 'https://www.magicbricks.com/' },
      { title: 'NoBroker', url: 'https://www.nobroker.in/' },
    ],
    company: [
      { title: 'Startup India', url: 'https://www.startupindia.gov.in/' },
    ],
  },
  osaka: {
    visa: { title: 'Japan Startup Visa', url: 'https://www.jetro.go.jp/en/invest/investment_environment/visa.html' },
    housing: [
      { title: 'SUUMO', url: 'https://suumo.jp/en/' },
      { title: 'GaijinPot Housing', url: 'https://housing.gaijinpot.com/' },
    ],
    company: [
      { title: 'JETRO Invest Japan', url: 'https://www.jetro.go.jp/en/invest/setting_up/' },
    ],
  },
};

function generateMoveSetup(data: CityData): string {
  const housingLinks = data.housing
    .map(
      (h) => `          {
                    title: "${h.title}",
                    url: "${h.url}",
                    description: "${h.title} rentals and long term stays."
          }`
    )
    .join(',\n');

  const companyLinks = data.company
    .map(
      (c) => `          {
                    title: "${c.title}",
                    url: "${c.url}",
                    description: "Official company registration and business investment portal."
          }`
    )
    .join(',\n');

  return `    {
      id: 'move-set-up',
      title: 'MOVE & SET UP',
      sections: [
        {
          id: 'visa',
          title: 'Visa & Immigration',
          links: [
          {
                    title: "${data.visa.title}",
                    url: "${data.visa.url}",
                    description: "Official visa application and traveler/expat portal."
          }
          ]
        },
        {
          id: 'housing',
          title: 'Housing',
          links: [
${housingLinks}
          ]
        },
        {
          id: 'company-setup',
          title: 'Company Setup',
          links: [
${companyLinks},
          {
                    title: "Stripe Atlas",
                    url: "https://stripe.com/atlas",
                    description: "Incorporate a US C-Corp from anywhere."
          }
          ]
        },
        {
          id: 'startup-perks',
          title: 'Startup Perks',
          links: [
          {
                    title: "AWS Activate",
                    url: "https://aws.amazon.com/activate/",
                    description: "AWS Activate cloud credits."
          },
          {
                    title: "Google for Startups",
                    url: "https://startup.google.com/",
                    description: "Cloud credits and technical programs."
          }
          ]
        }
      ]
    }`;
}

function processDirectory(): void {
  const dataDir = path.join(__dirname, 'movetocontinent-web', 'data', 'cities', 'asia');
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith('.ts'));
  let updatedCount = 0;

  for (const file of files) {
    const slug = file.replace('.ts', '');
    const filePath = path.join(dataDir, file);

    if (!(slug in cityDataMap)) {
      console.log(`ℹ️  No custom data defined for ${slug}, skipping.`);
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n');
    const customData = cityDataMap[slug];

    // Locate the start of the move-set-up block
    let startIdx = content.indexOf("    {\n      id: 'move-set-up',");
    if (startIdx === -1) startIdx = content.indexOf('    {\n      id: "move-set-up",');
    if (startIdx === -1) {
      const abstractIdx = content.indexOf("id: 'move-set-up'");
      if (abstractIdx !== -1) startIdx = content.lastIndexOf('    {', abstractIdx);
    }

    if (startIdx === -1) {
      console.log(`⚠️  Could not find start bound for ${slug}.ts!`);
      continue;
    }

    // Locate the start of the next meet-people block to use as the end boundary
    let endIdx = content.indexOf("    {\n      id: 'meet-people',", startIdx);
    if (endIdx === -1) endIdx = content.indexOf('    {\n      id: "meet-people",', startIdx);
    if (endIdx === -1) {
      const abstractEnd = content.indexOf("id: 'meet-people'", startIdx);
      if (abstractEnd !== -1) endIdx = content.lastIndexOf('    {', abstractEnd);
    }

    if (endIdx === -1) {
      console.log(`⚠️  Could not find end bound for ${slug}.ts!`);
      continue;
    }

    const newMoveSetup = generateMoveSetup(customData);
    const newContent = content.slice(0, startIdx) + newMoveSetup + ',\n\n' + content.slice(endIdx);

    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ Surgically updated ${slug}.ts with precise authentic links.`);
    updatedCount++;
  }

  console.log(`\nDone! Safely injected authentic links into ${updatedCount} Asia cities.`);
}

processDirectory();
