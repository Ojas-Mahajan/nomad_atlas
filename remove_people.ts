import * as fs from 'fs';
import * as path from 'path';

function removePeopleSection(filePath: string): boolean {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Regex to find the people-to-follow section within an object.
  // It looks for id: 'people-to-follow' or id: "people-to-follow"
  // and matches the entire object including its closing brace and following comma if present.
  const pattern = /\s*{\s*id:\s*['"]people-to-follow['"],.*?\n\s*},?\n?/gs;

  const newContent = content.replace(pattern, '');

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    return true;
  }
  return false;
}

function walkDir(dir: string, callback: (filePath: string) => void): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  }
}

function main(): void {
  const baseDir = path.join(__dirname, 'movetocontinent-web', 'data', 'cities');
  let count = 0;

  walkDir(baseDir, (filePath) => {
    if (filePath.endsWith('.ts')) {
      if (removePeopleSection(filePath)) {
        console.log(`Updated: ${filePath}`);
        count++;
      }
    }
  });

  console.log(`Total files updated: ${count}`);
}

main();
