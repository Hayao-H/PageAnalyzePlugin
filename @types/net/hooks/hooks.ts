import { DmcInfo } from "./types/dmcinfo";
import { NiconicoSessionInfo } from "./types/niconicoSessionInfo";

export interface Hooks {

    /**
     * 視聴ページ解析関数を登録する
     * @param func ページ解析関数
     */
    registerPageAnalyzeFunction(func: (page: string) => DmcInfo): void;

    /**
     * セッション確立関数を登録する
     * @param func セッション確立関数
     * @remarks 登録する関数はPromiseを返す必要があります。
     * @remarks 例えば、アロー関数を登録する場合はasyncでマークしてください。
     */
    registerSessionEnsuringFunction(func: (info: DmcInfo) => Promise<NiconicoSessionInfo>): void;

    /**
     * 動画情報取得関数を登録する
     * @param func 動画情報登録関数
     * @remarks 登録する関数はPromiseを返す必要があります。
     * @remarks 例えば、アロー関数を登録する場合はasyncでマークしてください。
     */
    registerVideoInfoFunction(func: (videoID: string, trackID: string) => Promise<DmcInfo>): void;
    
    /**
     * 各関数の登録状況を参照する
     */
    isRegistered(hookType: "PageAnalyze" | "WatchSession" | "RemoteInfo"): boolean;
}