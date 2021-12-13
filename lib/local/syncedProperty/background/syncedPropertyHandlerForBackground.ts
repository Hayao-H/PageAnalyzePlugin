import { SyncedProperty } from "../syncedProperty";
import { TabHandle } from "../../../../@types/local/tab/tab"
import { Message } from "../message";
import { SyncedPropertyHandlerBase } from "../syncedPropertyHandlerBase";

export class SyncedPropertyHanderForBackground<T extends string | number | boolean> extends SyncedPropertyHandlerBase<T> {

    //#region  field

    private readonly tabs: Array<TabHandle> = [];

    //#endregion

    //#region  Methods

    /**
     * 同期プロパティーを同期するタブを追加
     * @param tab タブ情報
     */
    public addSyncedTab(tab: TabHandle): void {
        this.tabs.push(tab);
        this.subscribeMessage(tab);
    }

    /**
     * 同期プロパティーを同期するタブを削除
     * @param tab タブ情報
     * @returns 操作の成功・不成功を表す真偽値
     */
    public removeSyncedTab(tab: TabHandle): boolean {
        const index = this.tabs.indexOf(tab);
        if (index < 0) {
            return false;
        }

        this.tabs.splice(index, 1);

        return true;
    }

    //#endregion

    //#region override
    
    private subscribeMessage(tab: TabHandle) {
        tab.addMessageHandler(message => {

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

        this.tabs.forEach(t => {
            t.postMessage(messageS);
        });

    }

    //#endregion    

}