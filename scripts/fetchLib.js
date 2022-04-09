const child_process = require("child_process");
const util = require("util");
const fs = require("fs-extra");
const path = require("path");
const execFile = util.promisify(child_process.execFile);

//設定
require("dotenv").config();

async function main() {

    if (!process.env.LIB_SWITCH_TO) {
        console.warn("gitのswitch先ブランチ/タグを指定してください。");
        return;
    }

    if (await fs.existsSync("NiconicomeAddonCoreLib")) {
        fs.rmSync("NiconicomeAddonCoreLib", { force: true, recursive: true });
    }

    console.log("標準ライブラリの取得を開始します。");

    try {
        await execFile("git", ["clone", "https://github.com/Hayao-H/NiconicomeAddonCoreLib.git"]);
    } catch (e) {
        console.error(e);
        return;
    }

    console.log("標準ライブラリの取得が完了しました。");

    console.log("ファイルのコピーを開始します。");

    const cwd = process.cwd();
    process.chdir("NiconicomeAddonCoreLib");


    try {
        await execFile("git", ["switch", process.env.LIB_SWITCH_TO]);
    } catch (e) { console.error(e); }

    process.chdir(cwd);


    fs.copySync("NiconicomeAddonCoreLib\\@types", "@types", { overwrite: true });
    fs.copySync("NiconicomeAddonCoreLib\\lib", "lib", { overwrite: true });


    fs.rmSync("NiconicomeAddonCoreLib", { force: true, recursive: true });
}

main()
    .catch(e => console.error(e))
    .finally(() => console.log("処理が完了しました。"));