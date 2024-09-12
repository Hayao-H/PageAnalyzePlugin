import { Response } from "../../@types/net/http/fetch/Response.d.ts";
import { WatchAPISimple } from "../../lib/net/types/json/api/watch/simple/api.ts";
import {
  AttemptResult,
  AttemptResultImpl,
} from "../../lib/utils/attemptResult.ts";
import { JsonUtils } from "../../lib/utils/jsonUtils.ts";

export interface APIFetcher {
  GetVideoInfo(
    videoID: string,
    trackID: string,
  ): Promise<AttemptResult<WatchAPISimple>>;
}

export class APIFetcherImpl implements APIFetcher {
  public async GetVideoInfo(
    videoID: string,
    trackID: string,
  ): Promise<AttemptResult<WatchAPISimple>> {
    let res: Response;
    try {
      res = await fetch(
        `https://www.nicovideo.jp/watch/${videoID}?responseType=json`,
        { credentials: "include" },
      );
    } catch (e: unknown) {
      if (e instanceof Error) {
        return new AttemptResultImpl(
          false,
          `APIへのアクセスに失敗しました。(詳細:${e.message})`,
        );
      } else {
        return new AttemptResultImpl(false, `APIへのアクセスに失敗しました。`);
      }
    }


    if (!res.ok) {
      return new AttemptResultImpl(
        false,
        `APIへのアクセスに失敗しました。(status:${res.status})`,
      );
    }

    const content: string = await res.text();
    const data: WatchAPISimple = JsonUtils.deserialize<WatchAPISimple>(content);

    return new AttemptResultImpl(true, "", data);
  }
}
