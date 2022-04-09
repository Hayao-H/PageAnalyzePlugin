export interface Message {


    /**
     * SyncedEventであるかどうか
     */
    isSyncedEvent: boolean;

    /**
     * メッセージタイプ
     */
    messageType: "eventDispatch";

    /**
     * イベント名
     */
    eventName: string;

    /**
     * イベントの引数
     */
    serializedEventData: string | null;

}