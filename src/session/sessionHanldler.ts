import { DmcInfo } from "../../@types/net/hooks/types/dmcinfo.d.ts";
import { NiconicoSessionInfo } from "../../@types/net/hooks/types/niconicoSessionInfo.d.ts";
import { SessionInfo } from "../../@types/net/hooks/types/sessioninfo.d.ts";
import { AttemptResult } from "../../lib/utils/attemptResult.ts";
import { DataComposer } from "./data/dataComposer.ts";
import { SessionEnsure } from "./ensure/sessionEnsure.ts";

export interface SessionHandler {
  /**
   * セッションを確立する
   * @param sessionInfo
   */
  EnsureSession(
    sessionInfo: SessionInfo,
  ): Promise<AttemptResult<NiconicoSessionInfo>>;

  GetAccessRight(dmcInfo: DmcInfo): Promise<AttemptResult<NiconicoSessionInfo>>;
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

  public async EnsureSession(
    sessionInfo: SessionInfo,
  ): Promise<AttemptResult<NiconicoSessionInfo>> {
    const data = this._dataComposer.Create(sessionInfo);

    return await this._sessionEnsure.EnsureSession(data);
  }

  public async GetAccessRight(
    dmcInfo: DmcInfo,
  ): Promise<AttemptResult<NiconicoSessionInfo>> {
    const data = this._dataComposer.CreateDMS(dmcInfo.DmsInfo);

    return await this._sessionEnsure.GetAccessRight(
      dmcInfo.Id,
      dmcInfo.TrackID,
      dmcInfo.DmsInfo.accessRightKey,
      data,
    );
  }
}
