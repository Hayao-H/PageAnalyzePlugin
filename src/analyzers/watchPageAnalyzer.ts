import { DmcInfo } from "../../@types/net/hooks/types/dmcinfo";
import { DataApiData } from "../../lib/net/types/json/watchpage/dataApiData";
import { AttemptResult, AttemptResultImpl } from "../../lib/utils/attemptResult";
import { DataConverter } from "../converter/dataCnverter";
import { WatchPageHandler } from "../parser/watchPagehandler";

export interface WatchPageANalyzer {

    /**
     * 視聴ページを解析する
     * @param source 視聴ページのhtml
     */
    analyze(source: string): AttemptResult<DmcInfo>;
}

export class WatchPageANalyzerImpl {


    constructor(handler: WatchPageHandler, converter: DataConverter) {
        this.handler = handler;
        this.converter = converter;
    }

    private readonly handler: WatchPageHandler;

    private readonly converter: DataConverter;

    public analyze(source: string): AttemptResult<DmcInfo> {

        const parseResult: AttemptResult<DataApiData> = this.handler.parseDocument(source);

        if (!parseResult.isSucceeded || parseResult.data == null) {
            return new AttemptResultImpl<DmcInfo>(false, parseResult.message, null, parseResult.exception);
        }

        const convertResult = this.converter.convert(parseResult.data);

        return convertResult;
    }
}