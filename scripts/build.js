const esbuild = require('esbuild');
const isDevelopment = process.env.MODE === 'development';
require('dotenv').config();

esbuild.build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    minify: !isDevelopment,
    sourcemap: 'inline',
    outdir: isDevelopment ?process.env.SCRIPT_DIR : 'output',
    platform: 'node',
}).catch((e) => console.error(e));
