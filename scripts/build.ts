import * as esbuild from "https://deno.land/x/esbuild@v0.19.7/mod.js";
import "https://deno.land/std@0.208.0/dotenv/load.ts";

const isDevelopment = Deno.args[0] === "development";

await esbuild.build({
  entryPoints: ["./src/main.ts"],
  bundle: true,
  minify: !isDevelopment,
  sourcemap: isDevelopment ? "inline" : false,
  outdir: isDevelopment ? Deno.env.get("SCRIPT_DIR") : "output",
  target: "es2021",
});

console.log(Deno.env.get("SCRIPT_DIR"));

Deno.exit(0);
