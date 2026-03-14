import * as fs from 'fs';
import * as path from 'path';

function fixFile(filePath: string): boolean {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Find the section by id
  const match = content.match(/id:\s*['"]people-to-follow['"]/);
  if (!match || match.index === undefined) return false;

  // Find the starting { before the match
  const startPos = content.lastIndexOf('{', match.index);
  if (startPos === -1) return false;

  // Find the matching } after startPos
  let braceCount = 0;
  let endPos = -1;
  for (let i = startPos; i < content.length; i++) {
    if (content[i] === '{') {
      braceCount++;
    } else if (content[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        endPos = i + 1;
        break;
      }
    }
  }

  if (endPos === -1) return false;

  // Check for trailing comma
  const afterBlock = content.slice(endPos);
  if (afterBlock.startsWith(',')) endPos += 1;

  let newContent = content.slice(0, startPos) + content.slice(endPos);

  // Fix potential trailing commas in arrays that might break linting or types
  // e.g., [ section1, section2, ] -> [ section1, section2 ]
  newContent = newContent.replace(/,\s*\]/g, '\n                    ]');
  // Fix potential double commas or commas after newline before bracket
  newContent = newContent.replace(/,\s*}/g, '\n                }');

  fs.writeFileSync(filePath, newContent, 'utf-8');
  return true;
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
      if (fixFile(filePath)) {
        console.log(`Fixed: ${filePath}`);
        count++;
      }
    }
  });

  console.log(
    `Successfully removed remaining people-to-follow sections in ${count} files.`
  );
}

main();
