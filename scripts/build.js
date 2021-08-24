const esbuild = require("esbuild");
const isDevelopment = process.env.MODE === "development";
const packageID="8c2e8f7f-3e53-4ec5-8e05-be43bf7c3a54";

esbuild.build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    minify: !isDevelopment,
    sourcemap: "inline",
    outdir: isDevelopment ? `G:\\Projects\\C#\\06_niconicome\\Niconicome\\Niconicome\\bin\\Debug\\net5.0-windows10.0.19041.0\\win-x64\\addons\\${packageID}\\scripts` : "output",
    platform: 'node',
}).catch((e) => console.error(e));
