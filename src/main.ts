import { Response } from "../@types/net/http/fetch/Response";
import { DmcinfoImpl } from "../lib/net/types/impl/dmcinfo";
import { DataApiData } from "../lib/net/types/json/watchpage/dataApiData";
import { OutputHandler } from "../lib/output/output";
import { AttemptResult } from "../lib/utils/attemptResult";
import { HtmlParserImpl } from "./parser/htmlParser";
import { JsonParserImpl } from "./parser/jsonParser";
import { WatchPageHandlerImpl } from "./parser/watchPagehandler";

main();
async function main() {

    const logger = new OutputHandler();
    if (logger.canUse) {
        logger.write("Hello World!!");

        application.hooks?.registerPageAnalyzeFunction(content => {

            const handler = new WatchPageHandlerImpl(new HtmlParserImpl(), new JsonParserImpl());
            const result: AttemptResult<DataApiData> = handler.parseDocument(content);

            if (!result.isSucceeded || result.data === null) {
                logger.write(`視聴ページの解析に失敗しました。(詳細:${result.message})`);
                throw new Error();
            }

            const info = new DmcinfoImpl();
            info.Title = result.data.video.title;
            info.UploadedOn = result.data.video.registeredAt;
            return info;
        });
    }

}

