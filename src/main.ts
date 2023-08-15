import { DmcInfo } from "../@types/net/hooks/types/dmcinfo";
import { OutputHandler } from "../lib/io/output";
import { AttemptResult } from "../lib/utils/attemptResult";
import { DataConverterImpl } from "./converter/dataCnverter";
import { HtmlParserImpl } from "./parser/htmlParser";
import { JsonParserImpl } from "./parser/jsonParser";
import { WatchPageHandlerImpl } from "./parser/watchPagehandler";
import { LoggerImpl } from "../lib/io/log";
import { WatchPageANalyzerImpl } from "./analyzers/watchPageAnalyzer";
import { APIFetcherImpl } from "./watchAPI/apiFetcher";
import { APIDataConverterImpl } from "./watchAPI/apiDataConverter";
import { APIHandlerImpl } from "./watchAPI/apiHandler";

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

        application.hooks?.registerVideoInfoFunction(async (videoID, trackID) => {
            const fetcher = new APIFetcherImpl();
            const converter = new APIDataConverterImpl();
            const handler = new APIHandlerImpl(converter, fetcher);

            const result: AttemptResult<DmcInfo> = await handler.GetVideoInfo(videoID, trackID);
            
            if (!result.isSucceeded || result.data === null) {
                const message = `視聴ページの解析に失敗しました。(詳細:${result.message})`;
                output.write(message);
                logger.error(message);
                throw new Error();
            }

            return result.data;
        });

        output.write("ページ解析機能の初期化が完了しました。");
    }

}

