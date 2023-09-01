import { NiconicoSessionInfo } from "../../@types/net/hooks/types/niconicoSessionInfo";
import { SessionInfo } from "../../@types/net/hooks/types/sessioninfo";
import { AttemptResult } from "../../lib/utils/attemptResult";
import { DataComposer } from "./data/dataComposer";
import { SessionEnsure } from "./ensure/sessionEnsure";

export interface SessionHandler {

    /**
     * セッションを確立する
     * @param sessionInfo 
     */
    EnsureSession(sessionInfo: SessionInfo): Promise<AttemptResult<NiconicoSessionInfo>>;
}

export class SessionHandler implements SessionHandler {

    constructor(dataComposer: DataComposer, sessionEnsure: SessionEnsure) {
        this._dataComposer = dataComposer;
        this._sessionEnsure = sessionEnsure;
    }

    //#region 

    private readonly _dataComposer: DataComposer;

    private readonly _sessionEnsure: SessionEnsure;

    //#endregion

    public async EnsureSession(sessionInfo: SessionInfo): Promise<AttemptResult<NiconicoSessionInfo>> {
        const data = this._dataComposer.Create(sessionInfo);

        return await this._sessionEnsure.EnsureSession(data);
    }

}