
import { Document } from "../../@types/global";
import { AttemptResult, AttemptResultImpl } from "../../lib/utils/attemptResult";

export interface HtmlParser {

    /**
     * ドキュメントを解析する
     * @param document ページコンテンツ
     */
    parse(document: string): AttemptResult<Document>;
}

export class HtmlParserImpl implements HtmlParser {

    public parse(source: string): AttemptResult<Document> {

        let document: Document;
        try {
            document = parseHtml(source);
        } catch (ex) {
            return new AttemptResultImpl(false, "ページの解析に失敗しました。", null, ex);
        }

        return new AttemptResultImpl(true, "", document);
    }


}