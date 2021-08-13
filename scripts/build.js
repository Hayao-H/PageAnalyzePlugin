const esbuild = require("esbuild");
const isDevelopment = process.env.MODE === "development";
const packageID="0ed383b3-a739-421e-989d-ee84b34e6ac8";

esbuild.build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    minify: !isDevelopment,
    sourcemap: "inline",
    outdir: isDevelopment ? `G:\\Projects\\C#\\06_niconicome\\Niconicome\\Niconicome\\bin\\Debug\\net5.0-windows10.0.19041.0\\win-x64\\addons\\${packageID}\\scripts` : "output",
    platform: 'node',
}).catch((e) => console.error(e));
