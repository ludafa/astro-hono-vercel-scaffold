import esbuild from 'esbuild';
import fs from 'fs/promises';
import path from 'path';
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const createServerlessFunction = async () => {
  const srcDir = path.join(__dirname, '../src');
  const outDir = path.join(__dirname, '../.vercel/output/functions/render.func');

  await fs.mkdir(outDir, { recursive: true });

  // functions bundle
  await esbuild.build({
    entryPoints: [path.join(srcDir, 'index.ts')],
    bundle: true,
    outfile: path.join(outDir, 'index.js'),
    platform: 'node',
    target: ['node20'],
    minify: false,
    treeShaking: true,
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
  });

  // .vercel/output/render.func/.vc-config.json
  await fs.writeFile(
    path.join(outDir, '.vc-config.json'),
    JSON.stringify(
      {
        runtime: 'nodejs20.x',
        handler: 'index.js',
        launcherType: 'Nodejs',
        shouldAddHelpers: false,
      },
      null,
      2,
    ),
    'utf-8',
  );

  // .vercel/output/config.json
  await fs.writeFile(
    path.join(__dirname, '../.vercel/output/config.json'),
    JSON.stringify(
      {
        version: 3,
        routes: [
          // for astro static files
          {
            src: '^/_astro/(.*)$',
            headers: {
              'cache-control': 'public, max-age=31536000, immutable',
            },
            continue: true,
          },
          {
            handle: 'filesystem',
          },
          {
            src: '/api/(.*)',
            dest: 'render',
          },
        ],
      },
      null,
      2,
    ),
    'utf-8',
  );
};

createServerlessFunction();
