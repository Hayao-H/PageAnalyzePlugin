import { Types } from "./types";

export interface Message {

    /**
     * syncedProperty用のデータであるかどうか
     */
    syncedProperty: boolean;

    /**
     * データ型
     */
    dataType: string;

    /**
     * データ
     */
    data: string;

    /**
     * 名前
     */
    name: string;

}