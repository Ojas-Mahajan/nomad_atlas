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

type ContinentCityMap = Record<string, Record<string, CityData>>;

const cityDataMap: ContinentCityMap = {
  'north-america': {
    austin: {
      visa: { title: 'USCIS', url: 'https://www.uscis.gov/' },
      housing: [
        { title: 'Zillow Austin', url: 'https://www.zillow.com/austin-tx/' },
        { title: 'Apartments.com', url: 'https://www.apartments.com/austin-tx/' },
      ],
      company: [
        { title: 'Texas Secretary of State', url: 'https://www.sos.state.tx.us/corp/' },
      ],
    },
    chicago: {
      visa: { title: 'USCIS', url: 'https://www.uscis.gov/' },
      housing: [
        { title: 'Domu Chicago', url: 'https://www.domu.com/' },
        { title: 'Zillow Chicago', url: 'https://www.zillow.com/chicago-il/' },
      ],
      company: [
        { title: 'Illinois Secretary of State', url: 'https://www.ilsos.gov/departments/business_services/' },
      ],
    },
    'los-angeles': {
      visa: { title: 'USCIS', url: 'https://www.uscis.gov/' },
      housing: [
        { title: 'Westside Rentals', url: 'https://www.westsiderentals.com/' },
        { title: 'Zillow LA', url: 'https://www.zillow.com/los-angeles-ca/' },
      ],
      company: [
        { title: 'California DOS', url: 'https://www.sos.ca.gov/business-programs/' },
      ],
    },
    'mexico-city': {
      visa: { title: 'INM Mexico', url: 'https://www.inm.gob.mx/gobmx/word/index.php/tramites/' },
      housing: [
        { title: 'Inmuebles24', url: 'https://www.inmuebles24.com/' },
        { title: 'Vivanuncios', url: 'https://www.vivanuncios.com.mx/' },
      ],
      company: [
        { title: 'Secretaría de Economía', url: 'https://e.economia.gob.mx/' },
      ],
    },
    miami: {
      visa: { title: 'USCIS', url: 'https://www.uscis.gov/' },
      housing: [
        { title: 'Zillow Miami', url: 'https://www.zillow.com/miami-fl/' },
        { title: 'Apartments.com Miami', url: 'https://www.apartments.com/miami-fl/' },
      ],
      company: [
        { title: 'Sunbiz Florida', url: 'https://dos.myflorida.com/sunbiz/' },
      ],
    },
    'new-york': {
      visa: { title: 'USCIS', url: 'https://www.uscis.gov/' },
      housing: [
        { title: 'StreetEasy', url: 'https://streeteasy.com/' },
        { title: 'Zillow NYC', url: 'https://www.zillow.com/new-york-ny/' },
      ],
      company: [
        { title: 'NY Department of State', url: 'https://dos.ny.gov/corps' },
      ],
    },
    'san-francisco': {
      visa: { title: 'USCIS', url: 'https://www.uscis.gov/' },
      housing: [
        { title: 'Zillow SF', url: 'https://www.zillow.com/san-francisco-ca/' },
        { title: 'Craigslist SF', url: 'https://sfbay.craigslist.org/' },
      ],
      company: [
        { title: 'California DOS', url: 'https://www.sos.ca.gov/business-programs/' },
      ],
    },
    seattle: {
      visa: { title: 'USCIS', url: 'https://www.uscis.gov/' },
      housing: [
        { title: 'Zillow Seattle', url: 'https://www.zillow.com/seattle-wa/' },
        { title: 'Craigslist Seattle', url: 'https://seattle.craigslist.org/' },
      ],
      company: [
        { title: 'Washington SOS', url: 'https://www.sos.wa.gov/corps/' },
      ],
    },
    toronto: {
      visa: { title: 'IRCC Canada', url: 'https://www.canada.ca/en/immigration-refugees-citizenship.html' },
      housing: [
        { title: 'Realtor.ca', url: 'https://www.realtor.ca/' },
        { title: 'PadMapper Toronto', url: 'https://www.padmapper.com/apartments/toronto-on' },
      ],
      company: [
        { title: 'Corporations Canada', url: 'https://ised-isde.canada.ca/site/corporations-canada/en' },
      ],
    },
    vancouver: {
      visa: { title: 'IRCC Canada', url: 'https://www.canada.ca/en/immigration-refugees-citizenship.html' },
      housing: [
        { title: 'Realtor.ca', url: 'https://www.realtor.ca/' },
        { title: 'Craigslist Vancouver', url: 'https://vancouver.craigslist.org/' },
      ],
      company: [
        { title: 'BC Registry Services', url: 'https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/permits-licences/businesses-incorporated-companies' },
      ],
    },
  },
  'south-america': {
    bogota: {
      visa: { title: 'Migración Colombia', url: 'https://www.migracioncolombia.gov.co/' },
      housing: [
        { title: 'Metrocuadrado', url: 'https://www.metrocuadrado.com/' },
        { title: 'FincaRaiz', url: 'https://www.fincaraiz.com.co/' },
      ],
      company: [
        { title: 'Cámara de Comercio de Bogotá', url: 'https://www.ccb.org.co/' },
      ],
    },
    'buenos-aires': {
      visa: { title: 'Migraciones Argentina', url: 'https://www.argentina.gob.ar/interior/migraciones' },
      housing: [
        { title: 'Zonaprop', url: 'https://www.zonaprop.com.ar/' },
        { title: 'Argenprop', url: 'https://www.argenprop.com/' },
      ],
      company: [
        { title: 'IGJ Argentina', url: 'https://www.argentina.gob.ar/justicia/igj' },
      ],
    },
    lima: {
      visa: { title: 'Migraciones Perú', url: 'https://www.migraciones.gob.pe/' },
      housing: [
        { title: 'Urbania', url: 'https://urbania.pe/' },
        { title: 'Adondevivir', url: 'https://adondevivir.com/' },
      ],
      company: [
        { title: 'SUNARP', url: 'https://www.gob.pe/sunarp' },
      ],
    },
    medellin: {
      visa: { title: 'Migración Colombia', url: 'https://www.migracioncolombia.gov.co/' },
      housing: [
        { title: 'Metrocuadrado', url: 'https://www.metrocuadrado.com/' },
        { title: 'FincaRaiz', url: 'https://www.fincaraiz.com.co/' },
      ],
      company: [
        { title: 'Cámara de Comercio de Medellín', url: 'https://www.camaramedellin.com/' },
      ],
    },
    montevideo: {
      visa: { title: 'Dirección Nacional de Migración', url: 'https://www.gub.uy/ministerio-interior/migracion' },
      housing: [
        { title: 'InfoCasas', url: 'https://www.infocasas.com.uy/' },
        { title: 'Gallito', url: 'https://www.gallito.com.uy/' },
      ],
      company: [
        { title: 'Uruguay XXI', url: 'https://www.uruguayxxi.gub.uy/en/' },
      ],
    },
    'rio-de-janeiro': {
      visa: { title: 'Polícia Federal', url: 'https://www.gov.br/pf/pt-br/assuntos/imigracao' },
      housing: [
        { title: 'Zap Imóveis', url: 'https://www.zapimoveis.com.br/' },
        { title: 'Viva Real', url: 'https://www.vivareal.com.br/' },
      ],
      company: [
        { title: 'JUCERJA', url: 'https://www.jucerja.rj.gov.br/' },
      ],
    },
    santiago: {
      visa: { title: 'Servicio Nacional de Migraciones', url: 'https://serviciomigraciones.cl/' },
      housing: [
        { title: 'Portal Inmobiliario', url: 'https://www.portalinmobiliario.com/' },
        { title: 'Yapo', url: 'https://www.yapo.cl/' },
      ],
      company: [
        { title: 'Tu Empresa en un Día', url: 'https://www.registrodeempresasysociedades.cl/' },
      ],
    },
    'sao-paulo': {
      visa: { title: 'Polícia Federal', url: 'https://www.gov.br/pf/pt-br/assuntos/imigracao' },
      housing: [
        { title: 'Zap Imóveis', url: 'https://www.zapimoveis.com.br/' },
        { title: 'QuintoAndar', url: 'https://www.quintoandar.com.br/' },
      ],
      company: [
        { title: 'JUCESP', url: 'https://jucesp.saopaulo.sp.gov.br/' },
      ],
    },
  },
  australia: {
    sydney: {
      visa: { title: 'Department of Home Affairs', url: 'https://immi.homeaffairs.gov.au/' },
      housing: [
        { title: 'Domain', url: 'https://www.domain.com.au/' },
        { title: 'Realestate.com.au', url: 'https://www.realestate.com.au/' },
      ],
      company: [
        { title: 'ASIC', url: 'https://asic.gov.au/' },
      ],
    },
    melbourne: {
      visa: { title: 'Department of Home Affairs', url: 'https://immi.homeaffairs.gov.au/' },
      housing: [
        { title: 'Domain', url: 'https://www.domain.com.au/' },
        { title: 'Realestate.com.au', url: 'https://www.realestate.com.au/' },
      ],
      company: [
        { title: 'ASIC', url: 'https://asic.gov.au/' },
      ],
    },
    brisbane: {
      visa: { title: 'Department of Home Affairs', url: 'https://immi.homeaffairs.gov.au/' },
      housing: [
        { title: 'Domain', url: 'https://www.domain.com.au/' },
        { title: 'Realestate.com.au', url: 'https://www.realestate.com.au/' },
      ],
      company: [
        { title: 'ASIC', url: 'https://asic.gov.au/' },
      ],
    },
    auckland: {
      visa: { title: 'Immigration New Zealand', url: 'https://www.immigration.govt.nz/' },
      housing: [
        { title: 'Trade Me Property', url: 'https://www.trademe.co.nz/a/property' },
        { title: 'Realestate.co.nz', url: 'https://www.realestate.co.nz/' },
      ],
      company: [
        { title: 'NZ Companies Office', url: 'https://companies-register.companiesoffice.govt.nz/' },
      ],
    },
    wellington: {
      visa: { title: 'Immigration New Zealand', url: 'https://www.immigration.govt.nz/' },
      housing: [
        { title: 'Trade Me Property', url: 'https://www.trademe.co.nz/a/property' },
        { title: 'Realestate.co.nz', url: 'https://www.realestate.co.nz/' },
      ],
      company: [
        { title: 'NZ Companies Office', url: 'https://companies-register.companiesoffice.govt.nz/' },
      ],
    },
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

function processAllContinents(): void {
  const baseDir = path.join(__dirname, 'movetocontinent-web', 'data', 'cities');
  let updatedCount = 0;

  for (const [continentFolder, cities] of Object.entries(cityDataMap)) {
    const continentPath = path.join(baseDir, continentFolder);

    if (!fs.existsSync(continentPath)) {
      console.log(`⚠️  Continent folder not found: ${continentFolder}, skipping.`);
      continue;
    }

    const files = fs.readdirSync(continentPath).filter((f) => f.endsWith('.ts'));

    for (const file of files) {
      const slug = file.replace('.ts', '');

      if (!(slug in cities)) {
        continue;
      }

      const filePath = path.join(continentPath, file);
      let content = fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n');
      const customData = cities[slug];

      // Locate the start of the move-set-up block
      let startIdx = content.indexOf("    {\n      id: 'move-set-up',");
      if (startIdx === -1) startIdx = content.indexOf('    {\n      id: "move-set-up",');
      if (startIdx === -1) {
        const abstractIdx = content.indexOf("id: 'move-set-up'");
        if (abstractIdx !== -1) startIdx = content.lastIndexOf('    {', abstractIdx);
      }

      if (startIdx === -1) {
        console.log(`⚠️  Could not find start bound for ${continentFolder}/${slug}.ts!`);
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
        console.log(`⚠️  Could not find end bound for ${continentFolder}/${slug}.ts!`);
        continue;
      }

      const newMoveSetup = generateMoveSetup(customData);
      const newContent =
        content.slice(0, startIdx) + newMoveSetup + ',\n\n' + content.slice(endIdx);

      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`✅ Surgically updated ${continentFolder}/${slug}.ts with precise authentic links.`);
      updatedCount++;
    }
  }

  console.log(`\nDone! Safely injected authentic links into ${updatedCount} cities across the remaining continents.`);
}

processAllContinents();
