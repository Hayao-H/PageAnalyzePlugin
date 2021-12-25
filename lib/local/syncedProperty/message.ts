export interface Message {

    /**
     * syncedProperty用のデータであるかどうか
     */
    syncedProperty: boolean;

    /**
     * メッセージの種別
     */
    messageType:string;

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

export const notifyChange = "notifyChange";

export const requestData = "requestData";