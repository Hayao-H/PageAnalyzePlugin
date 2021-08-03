const esbuild = require("esbuild");
const isDevelopment = process.env.MODE === "development";

esbuild.build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    minify: !isDevelopment,
    sourcemap: "inline",
    outdir: isDevelopment ? 'G:\\Projects\\C#\\06_niconicome\\Niconicome\\Niconicome\\bin\\Debug\\net5.0-windows10.0.19041.0\\win-x64\\addons\\7c5673c2-a6cf-4293-b237-154627087157\\scripts' : "output",
    platform: 'node',
}).catch((e) => console.error(e));
