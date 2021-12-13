import { SyncedProperty } from "../syncedProperty";
import { Message } from "../message";
import { SyncedPropertyHandlerBase } from "../syncedPropertyHandlerBase";

export class SyncedPropertyHandlerForTab<T extends string | number | boolean> extends SyncedPropertyHandlerBase<T>{

    constructor() {
        super();
        this.subscribeMessage();
    }

    //#region  override
    protected subscribeMessage() {

        window.chrome.webview.addEventListener('message', (message:string)=>{

            const data: Message = JSON.parse(message) as Message;

            if (data.syncedProperty !== true) {
                return;
            } else if (!this.exists(data.name)) {
                return
            }

            const p: SyncedProperty<T> = this.getProperty(data.name);

            if (data.dataType !== p.valueType) {
                return;
            }

            const value: T = this.parse(data.data, data.dataType);
            p.cancelSubscriptionOnce();
            p.value = value;
        });
    }

    protected postMessage(property: SyncedProperty<T>): void {

        const messageS = this.stringify(property);

        window.chrome.webview.postMessage(messageS);

    }

    //#endregion
}