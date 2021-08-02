import { DmcInfo } from "../@types/net/hooks/types/dmcinfo";
import { DataApiData } from "../lib/net/types/json/watchpage/dataApiData";
import { OutputHandler } from "../lib/output/output";
import { AttemptResult } from "../lib/utils/attemptResult";
import { DataConverterImpl } from "./converter/dataCnverter";
import { HtmlParserImpl } from "./parser/htmlParser";
import { JsonParserImpl } from "./parser/jsonParser";
import { WatchPageHandlerImpl } from "./parser/watchPagehandler";

main();

async function main() {

    const logger = new OutputHandler();

    if (logger.canUse) {

        application.hooks?.registerPageAnalyzeFunction(content => {

            const handler = new WatchPageHandlerImpl(new HtmlParserImpl(), new JsonParserImpl());
            const converter = new DataConverterImpl();
            
            const result: AttemptResult<DataApiData> = handler.parseDocument(content);

            if (!result.isSucceeded || result.data === null) {
                logger.write(`視聴ページの解析に失敗しました。(詳細:${result.message}, 例外:${result.exception?.message})`);
                throw new Error();
            }

            const cResult: AttemptResult<DmcInfo> = converter.convert(result.data);

            if (!cResult.isSucceeded || cResult.data === null) {

                logger.write(`視聴ページの解析に失敗しました。(詳細:${cResult.message}, 例外:${cResult.exception?.message})`);
                throw new Error();
            }

            return cResult.data;
        });

        logger.write("ページ解析機能の初期化が完了しました。");
    }

}

