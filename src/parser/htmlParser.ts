
import { ParentNode } from "../../@types/global";
import { AttemptResult, AttemptResultImpl } from "../../lib/utils/attemptResult";

export interface HtmlParser {

    /**
     * ドキュメントを解析する
     * @param document ページコンテンツ
     */
    parse(document: string): AttemptResult<ParentNode>;
}

export class HtmlParserImpl implements HtmlParser {

    public parse(source: string): AttemptResult<ParentNode> {

        let document: ParentNode;
        try {
            document = parseHtml(source);
        } catch (ex) {
            return new AttemptResultImpl(false, "ページの解析に失敗しました。", null, ex as Error | null);
        }

        return new AttemptResultImpl(true, "", document);
    }


}