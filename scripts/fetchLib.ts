import "https://deno.land/std@0.208.0/dotenv/load.ts";

import * as fs from "https://deno.land/std@0.208.0/fs/mod.ts";

if (!Deno.env.get("LIB_SWITCH_TO")) {
  console.warn("gitのswitch先ブランチ/タグを指定してください。");
  Deno.exit(1);
}

console.log(Deno.cwd());

console.log("標準ライブラリの取得を開始します。");

const clone = new Deno.Command(
  "powershell",
  {
    args: [
      "git",
      "clone",
      "https://github.com/Hayao-H/NiconicomeAddonCoreLib.git",
    ],
  },
);
const cloneResult = await clone.output();

if (!cloneResult.success) {
  console.error("標準ライブラリの取得に失敗しました。");
  console.error(cloneResult.stderr);
  Deno.exit(1);
}

console.log("標準ライブラリの取得が完了しました。");

console.log("ファイルのコピーを開始します。");

Deno.chdir("NiconicomeAddonCoreLib");

const switchBranch = new Deno.Command(
  "powershell",
  {
    args: [
      "git",
      "switch",
      Deno.env.get("LIB_SWITCH_TO") ?? "",
    ],
  },
);
const switchBranchResult = await switchBranch.output();

if (!switchBranchResult.success) {
  console.error("git switchに失敗しました。");
  console.error(switchBranchResult.stderr);
  Deno.exit(1);
}

Deno.chdir("../")

fs.copySync("NiconicomeAddonCoreLib\\@types", "@types", { overwrite: true });
fs.copySync("NiconicomeAddonCoreLib\\lib", "lib", { overwrite: true });

await Deno.remove("NiconicomeAddonCoreLib", { recursive: true });

Deno.exit(0);
