import { ParentNode } from "../../@types/global.d.ts";
import { DataApiData } from "../../lib/net/types/json/watchpage/dataApiData.ts";
import { AttemptResult, AttemptResultImpl } from "../../lib/utils/attemptResult.ts";
import { HtmlParser } from "./htmlParser.ts";
import { JsonParser } from "./jsonParser.ts";

export interface WatchPageHandler {

    /**
     * 視聴ページを解析してデータを取得する
     * @param doc 視聴ページのhtml
     */
    parseDocument(doc: string): AttemptResult<DataApiData>;
}

export class WatchPageHandlerImpl implements WatchPageHandler {

    constructor(htmlParser: HtmlParser, jsonParser: JsonParser) {
        this.htmlParser = htmlParser;
        this.jsonParser = jsonParser;
    }

    private readonly htmlParser: HtmlParser;

    private readonly jsonParser: JsonParser;

    public parseDocument(doc: string): AttemptResult<DataApiData> {

        const hResult: AttemptResult<ParentNode> = this.htmlParser.parse(doc);

        if (!hResult.isSucceeded || hResult.data === null) {
            return new AttemptResultImpl<DataApiData>(false, hResult.message, null, hResult.exception);
        }

        const jResult: AttemptResult<DataApiData> = this.jsonParser.getApiData(hResult.data);

        return jResult;

    }


}