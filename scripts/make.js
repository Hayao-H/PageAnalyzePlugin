const fs = require("fs");
const archiver = require("archiver");
const path = require("path");

const tempDir = "temp";
const jsPath = "output/main.js";
const manifestPath = "assets/manifest.json";
const iconsDirPath = "assets/icons";
const addonFilePath = path.join("output", "PageAnalyzePlugin.zip");

if (!fs.existsSync(jsPath)) {
    console.error("JSファイルが存在しません！");
    process.exit(1);
}

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

if (!fs.existsSync(path.join(tempDir, "scripts"))) {
    fs.mkdirSync(path.join(tempDir, "scripts"));
}

if (!fs.existsSync(path.join(tempDir, "icons"))) {
    fs.mkdirSync(path.join(tempDir, "icons"));
}

fs.readdirSync(iconsDirPath).forEach(p => {
    const fullPath = path.join(iconsDirPath, p);
    fs.copyFileSync(fullPath, path.join(tempDir, "icons", p));
});

fs.copyFileSync(jsPath, path.join(tempDir, "scripts", "main.js"));
fs.copyFileSync(manifestPath, path.join(tempDir, "manifest.json"));

//圧縮処理
const archive = archiver.create("zip");
const stream = fs.createWriteStream(addonFilePath);

archive.pipe(stream);
archive.directory(tempDir, false);

archive.finalize();

stream.on("close", () => {
    fs.rmSync(tempDir, { recursive: true, force: true });
});
