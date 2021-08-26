const esbuild = require("esbuild");
const isDevelopment = process.env.MODE === "development";
const packageID="f3c9dc0d-09d5-48b3-bd07-94179570f2e4";

esbuild.build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    minify: !isDevelopment,
    sourcemap: "inline",
    outdir: isDevelopment ? `G:\\Projects\\C#\\06_niconicome\\Niconicome\\Niconicome\\bin\\Debug\\net5.0-windows10.0.19041.0\\win-x64\\addons\\${packageID}\\scripts` : "output",
    platform: 'node',
}).catch((e) => console.error(e));
