import { NiconicoSessionInfo } from "../../../@types/net/hooks/types/niconicoSessionInfo";
import { NiconicoSessionInfoImpl } from "../../../lib/net/types/impl/niconicoSessionInfo";
import { Request } from "../../../lib/net/types/json/session/request";
import { Response } from "../../../lib/net/types/json/session/response";
import { AttemptResult, AttemptResultImpl } from "../../../lib/utils/attemptResult";

export interface SessionEnsure {

    /**
     * セッションを確立する
     * @param request 
     */
    EnsureSession(request: Request): Promise<AttemptResult<NiconicoSessionInfo>>;
}

export class SessionEnsureImpl implements SessionEnsure {

    public async EnsureSession(request: Request): Promise<AttemptResult<NiconicoSessionInfo>> {
        const json = JSON.stringify(request);

        const res = await fetch("https://api.dmc.nico/api/sessions?_format=json", {
            method: "POST",
            credentials: "include",
            body: json
        });

        if (!res.ok) {
            return new AttemptResultImpl<NiconicoSessionInfo>(false, `DMCサーバーへのPOSTに失敗しました。(status:${res.status} )`);
        }

        const content = await res.text();
        const data: Response = JSON.parse(content);

        const info = new NiconicoSessionInfoImpl();
        info.ContentUrl = data.data.session.content_uri;
        info.SessionId = data.data.session.id;
        info.DmcResponseJsonData = content;

        return new AttemptResultImpl<NiconicoSessionInfo>(true, "", info);
    }
}