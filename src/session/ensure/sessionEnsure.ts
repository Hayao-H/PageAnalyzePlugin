import { NiconicoSessionInfo } from "../../../@types/net/hooks/types/niconicoSessionInfo.d.ts";
import { NiconicoSessionInfoImpl } from "../../../lib/net/types/impl/niconicoSessionInfo.ts";
import { Request } from "../../../lib/net/types/json/session/request.ts";
import { Response } from "../../../lib/net/types/json/session/response.ts";
import {
  AttemptResult,
  AttemptResultImpl,
} from "../../../lib/utils/attemptResult.ts";
import { JsonUtils } from "../../../lib/utils/jsonUtils.ts";
import { DMSRequest } from "../data/dmsRequest.ts";
import { DMSResponse } from "./dmsResponse.ts";

export interface SessionEnsure {
  /**
   * セッションを確立する
   * @param request
   */
  EnsureSession(request: Request): Promise<AttemptResult<NiconicoSessionInfo>>;

  /**
   * 視聴権限を取得
   * @param dmsRequest
   */
  GetAccessRight(
    videoID: string,
    trackID: string,
    accessKey: string,
    dmsRequest: DMSRequest,
  ): Promise<AttemptResult<NiconicoSessionInfo>>;
}

export class SessionEnsureImpl implements SessionEnsure {
  public async EnsureSession(
    request: Request,
  ): Promise<AttemptResult<NiconicoSessionInfo>> {
    const json = JSON.stringify(request);

    const res = await fetch("https://api.dmc.nico/api/sessions?_format=json", {
      method: "POST",
      credentials: "include",
      body: json,
    });

    if (!res.ok) {
      return new AttemptResultImpl<NiconicoSessionInfo>(
        false,
        `DMCサーバーへのPOSTに失敗しました。(status:${res.status} )`,
      );
    }

    const content = await res.text();
    const data: Response = JSON.parse(content);

    const info = new NiconicoSessionInfoImpl();
    info.ContentUrl = data.data.session.content_uri;
    info.SessionId = data.data.session.id;
    info.DmcResponseJsonData = JSON.stringify(data.data);

    return new AttemptResultImpl<NiconicoSessionInfo>(true, "", info);
  }

  public async GetAccessRight(
    videoID: string,
    trackID: string,
    accessKey: string,
    dmsRequest: DMSRequest,
  ): Promise<AttemptResult<NiconicoSessionInfo>> {
    const request = JsonUtils.serialize(dmsRequest);
    const res = await fetch(
      `https://nvapi.nicovideo.jp/v1/watch/${videoID}/access-rights/hls?actionTrackId=${trackID}`,
      {
        headers: {
          "X-Access-Right-Key": accessKey,
          "X-Request-With": "https://www.nicovideo.jp",
          "X-Frontend-Version": "0",
          "X-Frontend-Id": "6",
        },
        method: "POST",
        body: request,
        credentials: "include",
      },
    );

    if (!res.ok) {
      return new AttemptResultImpl<NiconicoSessionInfo>(
        false,
        `アクセス権限の取得に失敗しました。(status:${res.status} )`,
      );
    }

    const data = JsonUtils.deserialize<DMSResponse>(await res.text());
    const info = new NiconicoSessionInfoImpl();
    info.ContentUrl = data.data.contentUrl;
    info.IsDMS = true;

    return new AttemptResultImpl<NiconicoSessionInfo>(true, "", info);
  }
}
