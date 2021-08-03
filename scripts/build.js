const esbuild = require("esbuild");
const isDevelopment = process.env.MODE === "development";

esbuild.build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    minify: !isDevelopment,
    sourcemap: "inline",
    outdir: isDevelopment ? 'G:\\Projects\\C#\\06_niconicome\\Niconicome\\Niconicome\\bin\\Debug\\net5.0-windows10.0.19041.0\\win-x64\\addons\\5147f547-c273-411c-a8ae-49d4fc6ffa7e\\scripts' : "output",
    platform: 'node',
}).catch((e) => console.error(e));
