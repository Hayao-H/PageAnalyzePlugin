import { DmcInfo } from "./types/dmcinfo";

export interface Hooks {

    /**
     * 視聴ページ解析関数を登録する
     * @param func ページ解析関数
     */
    registerPageAnalyzeFunction(func: (page: string) => DmcInfo): void;
}