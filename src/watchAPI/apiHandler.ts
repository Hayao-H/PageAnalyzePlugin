import { DmcInfo } from "../../@types/net/hooks/types/dmcinfo.d.ts";
import { AttemptResult, AttemptResultImpl } from "../../lib/utils/attemptResult.ts";
import { APIDataConverter } from "./apiDataConverter.ts";
import { APIFetcher } from "./apiFetcher.ts";

export interface APIHandler {
    GetVideoInfo(videoID: string, trackID: string): Promise<AttemptResult<DmcInfo>>;
}

export class APIHandlerImpl implements APIHandler {

    constructor(converter: APIDataConverter, fetcher: APIFetcher) {
        this._converter = converter;
        this._fetcher = fetcher;
    }

    //#region 

    private readonly _converter: APIDataConverter;

    private readonly _fetcher: APIFetcher;

    //#endregion

    public async GetVideoInfo(videoID: string, trackID: string): Promise<AttemptResult<DmcInfo>> {
        const fetchresult = await this._fetcher.GetVideoInfo(videoID, trackID);
        if (!fetchresult.isSucceeded || fetchresult.data === null) {
            return new AttemptResultImpl(false, fetchresult.message);
        }

        const data = this._converter.Convert(fetchresult.data);

        return data;
    }

}