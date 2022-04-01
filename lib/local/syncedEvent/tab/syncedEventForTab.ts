import { SyncedEventBase } from "../syncedEventBase";
import { Message } from "../message";
import { JsonUtils } from "../../../utils/jsonUtils";

export class SyncedEventForTab extends SyncedEventBase {

    constructor() {
        super();
        window.chrome.webview.addEventListener("message", message => this.receiveEVent(message.data));
    }

    //#region  private


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
        const data: null | string = arg === undefined ? null : JSON.stringify(arg);
        const message: Message = { isSyncedEvent: true, messageType: "eventDispatch", eventName: eventName, serializedEventData: data };
        const messageS = JsonUtils.serialize(message);

        window.chrome.webview.postMessage(messageS);

    }

    //#endregion
}