import { SyncedProperty } from "../syncedProperty.ts";
import { Message, requestData } from "../message.ts";
import { SyncedPropertyHandlerBase } from "../syncedPropertyHandlerBase.ts";

export class SyncedPropertyHandlerForTab<T> extends SyncedPropertyHandlerBase<T>{

    /**
     * コンストラクタ
     * @param defaultValue getPropertyメソッドで、プロパティーが存在しない場合に返す初期値
     */
    constructor(defaultValue: T) {
        super(defaultValue);
        this.subscribeMessage();
    }

    //#region  override
    protected subscribeMessage() {

        window.chrome.webview.addEventListener('message', (message: MessageEvent) => {

            const data: Message = JSON.parse(message.data) as Message;

            if (data.syncedProperty !== true) {
                return;
            }

            const p: SyncedProperty<T> = this.getProperty(data.name);

            const value: T|null = this.parse(data.data);

            if (value===null){
                return;
            }

            p.cancelSubscriptionOnce();
            p.value = value;
        });

        const message: Message = {
            syncedProperty: true,
            messageType: requestData,
            data: "",
            name: ""
        };

        window.chrome.webview.postMessage(message);
    }

    protected postMessage(property: SyncedProperty<T>): void {

        const message = this.serialize(property);

        window.chrome.webview.postMessage(message);

    }

    //#endregion
}