# NomadAtlas

*A comprehensive relocation platform for digital nomads, startup founders, and remote workers*

Pick a continent. Pick a city. Get the playbook.

## 🌍 Overview

NomadAtlas is a web application that provides detailed relocation guides for 75+ cities across 6 continents. It offers comprehensive information about visa requirements, cost of living, startup ecosystems, and practical guidance for international relocation.

## 🚀 Features

### 📍 City Coverage
- **75+ cities** across 6 continents
- **6 continents**: Europe, Asia, North America, South America, Australia, Africa
- **Detailed profiles** for each major tech hub and startup ecosystem

### 📊 Comprehensive Information
- **Visa & Immigration**: Difficulty levels and requirements
- **Cost of Living**: Rent estimates and expense levels
- **English Proficiency**: Language accessibility ratings
- **Startup Ecosystem**: Size, growth, and focus areas
- **Practical Resources**: Housing, banking, healthcare setup

### 🏢 Startup & Business Resources
- **Accelerators & Incubators**: Local programs and opportunities
- **Funding Landscape**: Venture capital and investment options
- **Job Market**: Talent acquisition and employment insights
- **Networking Events**: Meetups, conferences, and hackathons

### 🔍 Search & Discovery
- **City Search**: Find locations by name and characteristics
- **Continent Navigation**: Browse regions systematically
- **Comparison Tools**: Side-by-side city analysis
- **Personalized Recommendations**: Tailored guidance based on preferences

### 📱 User Experience
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, intuitive interface with TailwindCSS
- **Fast Performance**: Optimized Next.js deployment
- **Accessibility**: WCAG-compliant design patterns

## 🛠 Tech Stack

### Frontend Framework
- **Next.js 16** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript 5** - Type-safe development

### Styling & Design
- **TailwindCSS v4** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Inter Font** - Clean, readable typography

### Development Tools
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization
- **TypeScript** - Static type checking

## 🎯 Use Cases

### For Digital Nomads
- Compare cost of living across cities
- Understand visa requirements and processes
- Find cities with strong digital infrastructure
- Connect with local nomad communities

### For Startup Founders
- Evaluate startup ecosystems globally
- Identify funding opportunities and accelerators
- Understand talent availability and costs
- Research market entry strategies

### For Remote Workers
- Find remote-friendly cities and communities
- Understand tax and legal requirements
- Locate quality housing and coworking spaces
- Balance lifestyle with career opportunities

### For Expats & Relocators
- Step-by-step relocation guidance
- Cultural integration resources
- Healthcare and education information
- Banking and financial setup instructions

## 📁 Project Structure

```
movetocontinent-web/
├── app/                          # Next.js App Router
│   ├── [continent]/             # Dynamic continent routes
│   ├── cities/                  # City-specific pages
│   ├── search/                  # Search functionality
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/                  # React components
│   ├── city/                   # City-specific components
│   ├── continent/              # Continent components
│   ├── home/                   # Homepage sections
│   ├── layout/                 # Layout components
│   └── ui/                     # Reusable UI elements
├── data/                       # Application data
│   ├── cities/                 # City data by continent
│   ├── continents/             # Continent definitions
│   └── index.ts               # Data exports
├── types/                      # TypeScript type definitions
├── public/                     # Static assets
└── scripts/                    # Utility scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movetocontinent-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm start
```

## 🏗 Data Architecture

### City Structure
Each city includes:
- **Basic Info**: Name, country, continent, description
- **Snapshot**: Cost, rent, English level, visa difficulty, ecosystem size
- **Section Groups**: Organized guides for different aspects of relocation
- **Links**: Curated resources for specific topics

### TypeScript Interfaces
- `City`: Complete city profile structure
- `Continent`: Regional organization and city collections
- `CitySnapshot`: Quick overview metrics
- `SectionGroup`: Thematic content organization
- `CityLink`: Resource references with descriptions

## 📊 Data Sources

### Primary Sources
- **Numbeo** - Cost of living and quality of life metrics
- **Startup Ecosystem Reports** - Local startup data and trends
- **Government Immigration Sites** - Official visa requirements
- **Local Communities** - Crowdsourced insights and experiences

### Data Updates
- Regular updates from official sources
- Community contributions and feedback
- Automated validation and link checking

## 🤝 Contributing

We welcome contributions to improve the platform!

### Adding New Cities

1. Create city data file in appropriate continent directory
2. Follow the `City` interface structure
3. Include all required sections and links
4. Add export to `data/index.ts`
5. Test the implementation

### Content Guidelines
- Provide accurate, up-to-date information
- Include authoritative sources for official requirements
- Add practical, actionable advice
- Maintain consistent formatting and style

### Code Contributions
- Follow existing code patterns and TypeScript conventions
- Ensure responsive design compatibility
- Add appropriate error handling
- Include tests for new features

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📈 Roadmap

### Upcoming Features
- **Interactive Maps**: Visual city exploration
- **User Accounts**: Personalized recommendations and saved cities
- **Community Features**: User reviews and discussions
- **Real-time Updates**: Dynamic cost of living tracking
- **Mobile App**: Native iOS and Android applications

### Data Expansion
- **More Cities**: Expanded coverage to 200+ cities
- **Enhanced Metrics**: Additional quality of life indicators
- **Historical Data**: Cost and ecosystem trend analysis
- **Integration APIs**: Third-party data partnerships

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.



---

**NomadAtlas** - Your global relocation companion. Pick a destination, get the playbook, make the move.
