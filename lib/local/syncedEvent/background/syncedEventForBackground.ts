import { TabHandle } from "../../../../@types/local/tab/tab";
import { JsonUtils } from "../../../utils/jsonUtils";
import { Message } from "../message";
import { SyncedEventBase } from "../syncedEventBase";

export class SyncedEventForBackground extends SyncedEventBase {

    //#region  private

    private syncedTabs: TabHandle[] = [];

    /**
     * イベントを受信
     * @param message メッセージ
     * @returns 
     */
    private receiveEVent(message: string): void {

        const m: Message = JsonUtils.deserialize<Message>(message);
        if (!m.isSyncedEvent) {
            return;
        }

        if (m.serializedEventData === null) {
            this.dispatch(m.eventName, null);
        } else {
            this.dispatch(m.eventName, JsonUtils.deserialize<unknown>(m.serializedEventData));
        }
    }

    //#endregion

    //#region  Method

    /**
     * イベントを発火する
     * @param eventName イベント名
     * @param arg 引数
     */
    public fire(eventName: string, arg: unknown): void
    public fire(eventName: string): void
    public fire(eventName: string, arg: unknown | undefined = undefined): void {
        const data: null | string = arg === undefined ? null : JsonUtils.serialize(arg);
        const message: Message = { isSyncedEvent: true, messageType: "eventDispatch", eventName: eventName, serializedEventData: data };
        const messageS = JsonUtils.serialize(message);

        this.syncedTabs.forEach(tab => tab.postMessage(messageS));

    }

    /**
     * イベントを通知・購読するタブを追加
     * @param tab タブハンドル
     */
    public addSyncedTab(tab: TabHandle): void {

        tab.addMessageHandler(message => this.receiveEVent(message));

        this.syncedTabs.push(tab);
    }

    //#endregion
}