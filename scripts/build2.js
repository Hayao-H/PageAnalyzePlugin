const esbuild = require('esbuild');
const isDevelopment = process.env.MODE === 'development';
require('dotenv').config();

esbuild.build({
    entryPoints: ['./src/tab.ts'],
    bundle: true,
    minify: !isDevelopment,
    sourcemap: 'inline',
    outdir: isDevelopment ?process.env.RESOURCE_DIR : 'output',
    platform: 'node',
}).catch((e) => console.error(e));
