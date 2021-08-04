const esbuild = require("esbuild");
const isDevelopment = process.env.MODE === "development";
const packageID="e8554d67-647e-4ce9-8826-6b58adb8631e";

esbuild.build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    minify: !isDevelopment,
    sourcemap: "inline",
    outdir: isDevelopment ? `G:\\Projects\\C#\\06_niconicome\\Niconicome\\Niconicome\\bin\\Debug\\net5.0-windows10.0.19041.0\\win-x64\\addons\\${packageID}\\scripts` : "output",
    platform: 'node',
}).catch((e) => console.error(e));
