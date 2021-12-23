export interface NiconicoSessionInfo {
    /**
     * HeartBeatで送信するコンテンツ
     */
    DmcResponseJsonData: string;

    /**
     * プレイリストのURL
     */
    ContentUrl: string;

    /**
     * セッションID
     */
    SessionId: string;
}