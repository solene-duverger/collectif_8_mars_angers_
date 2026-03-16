import fs from 'fs';
import path from 'path';

export function getPageContent(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  const raw = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(raw);
}

export function getAllContent(dirPath) {
  const fullDir = path.join(process.cwd(), dirPath);
  if (!fs.existsSync(fullDir)) return [];
  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const raw = fs.readFileSync(path.join(fullDir, file), 'utf8');
    return { ...JSON.parse(raw), _slug: file.replace('.json', '') };
  });
}
