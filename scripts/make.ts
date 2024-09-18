import * as fs from "https://deno.land/std@0.208.0/fs/mod.ts";


await fs.ensureDir("tmp");
await fs.ensureDir("tmp/scripts");

await fs.copy("./output/main.js", "tmp/scripts/main.js", { overwrite: true });
await fs.copy("./assets/icons", "tmp/icons", { overwrite: true });
await fs.copy("./assets/manifest.json", "tmp/manifest.json", { overwrite: true });

const command = new Deno.Command("C:/Program Files/PowerShell/7/pwsh.exe", {
    args: ["-Command","& {Compress-Archive -Path ./tmp/* -DestinationPath ./output/PageAnalyzePlugin.zip -Force}"],
});

const output = await command.output();
const decoder = new TextDecoder();

if (!output.success) {
    console.error(decoder.decode(output.stderr));
    Deno.exit(1);
}

console.log("発行が完了しました。");

await Deno.remove("tmp", { recursive: true });