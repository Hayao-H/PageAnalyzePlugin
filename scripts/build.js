const esbuild = require('esbuild');
const isDevelopment = process.env.MODE === 'development';
require('dotenv').config();

esbuild.build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    minify: !isDevelopment,
    sourcemap: isDevelopment ? 'inline' : false,
    outdir: isDevelopment ? process.env.SCRIPT_DIR : 'output',
    target: "es2021",
}).catch((e) => console.error(e));
