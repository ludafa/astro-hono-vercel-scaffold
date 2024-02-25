import { promises as fs, existsSync } from 'fs';
import path from 'path';
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const serverDir = path.join(__dirname, '../server');
const clientDir = path.join(__dirname, '../client');
const targetDir = path.join(__dirname, '../../.vercel');
const build = async () => {
  if (existsSync(targetDir)) {
    await fs.rm(targetDir, {
      recursive: true,
    });
  }
  await fs.cp(path.join(serverDir, '.vercel'), targetDir, { recursive: true });
  await fs.cp(path.join(clientDir, 'dist'), path.join(targetDir, 'output/static'), { recursive: true });
  console.log('done');
};

build();
