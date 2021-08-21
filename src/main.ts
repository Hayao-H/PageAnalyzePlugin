import { DmcInfo } from "../NiconicomeAddonCoreLib/@types/net/hooks/types/dmcinfo";
import { OutputHandler } from "../NiconicomeAddonCoreLib/lib/io/output";
import { AttemptResult } from "../NiconicomeAddonCoreLib/lib/utils/attemptResult";
import { DataConverterImpl } from "./converter/dataCnverter";
import { HtmlParserImpl } from "./parser/htmlParser";
import { JsonParserImpl } from "./parser/jsonParser";
import { WatchPageHandlerImpl } from "./parser/watchPagehandler";
import { LoggerImpl } from "../NiconicomeAddonCoreLib/lib/io/log";
import { WatchPageANalyzerImpl } from "./analyzers/watchPageAnalyzer";

main();

async function main() {

    const output = new OutputHandler();
    const logger = new LoggerImpl();

    if (output.canUse) {

        application.hooks?.registerPageAnalyzeFunction(content => {

            const handler = new WatchPageHandlerImpl(new HtmlParserImpl(), new JsonParserImpl());
            const converter = new DataConverterImpl();
            const analyzer = new WatchPageANalyzerImpl(handler, converter);

            const result: AttemptResult<DmcInfo> = analyzer.analyze(content);

            if (!result.isSucceeded || result.data === null) {
                const message = `視聴ページの解析に失敗しました。(詳細:${result.message}, 例外:${result.exception?.message})`;
                output.write(message);
                logger.error(message);
                throw new Error();
            }

            return result.data;
        });

        output.write("ページ解析機能の初期化が完了しました。");
    }

}

