import { ParentNode } from "../../@types/global";
import { DataApiData } from "../../lib/net/types/json/watchpage/dataApiData";
import { AttemptResult, AttemptResultImpl } from "../../lib/utils/attemptResult";

export interface JsonParser {
    getApiData(dom: ParentNode): AttemptResult<DataApiData>;
}

export class JsonParserImpl implements JsonParser {
    public getApiData(dom: ParentNode): AttemptResult<DataApiData> {
        let jsonContent: string;

        try {
            jsonContent = dom.QuerySelector("#js-initial-watch-data")?.GetAttribute("data-api-data") ?? "";
        } catch (ex) {
            return new AttemptResultImpl(false, "ページの解析に失敗しました。", null, ex instanceof Error ? ex : null);
        }

        let data: DataApiData;
        function reviver(key: string, val: any): any | undefined {
            if (typeof (val) == "string" &&
                val.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?\+\d{2}:\d{2}$/)) {
                return new Date(Date.parse(val));
            }
            return val;
        }

        try {

            data = JSON.parse(jsonContent, reviver);
        } catch (ex) {
            return new AttemptResultImpl(false, "Jsonの解析に失敗しました。", null, ex instanceof Error ? ex : null);
        }

        return new AttemptResultImpl(true, "", data);
    }

}