import { Response } from "../../@types/net/http/fetch/Response";
import { WatchAPIV3 } from "../../lib/net/types/json/api/watch/v3/api";
import { AttemptResult, AttemptResultImpl } from "../../lib/utils/attemptResult";
import { JsonUtils } from "../../lib/utils/jsonUtils";

export interface APIFetcher {
    GetVideoInfo(videoID: string, trackID: string): Promise<AttemptResult<WatchAPIV3>>;
}

export class APIFetcherImpl implements APIFetcher {
    public async GetVideoInfo(videoID: string, trackID: string): Promise<AttemptResult<WatchAPIV3>> {

        let res: Response;
        try {
            res = await fetch(`https://www.nicovideo.jp/api/watch/v3/${videoID}?actionTrackId=${trackID}`, { credentials: "include" });
        } catch (e: any) {
            return new AttemptResultImpl(false, `APIへのアクセスに失敗しました。(詳細:${e.message})`,);
        }

        if (!res.ok) {
            return new AttemptResultImpl(false, `APIへのアクセスに失敗しました。`,);
        }

        const content: string = await res.text();
        const data: WatchAPIV3 = JsonUtils.deserialize<WatchAPIV3>(content);

        return new AttemptResultImpl(true, "", data);
    }
}