import { SyncedEventArgs } from "./syncedEventArgs.ts";

export class SyncedEventBase {

    //#region private

    private _listner: { [eventName: string]: ((arg: SyncedEventArgs) => void)[] } = {};

    /**
     * リスナーを実行する
     * @param eventName イベント名
     * @param arg 引数
     */
    protected dispatch(eventName: string, arg: unknown) {
        const e = new SyncedEventArgs(arg);
        if (eventName in this._listner) {
            this._listner[eventName].forEach(listner => listner(e));
        }
    }

    //#endregion

    /**
     * イベントを購読する
     * @param eventName イベント名
     * @param listner イベントリスナー
     */
    public addEventListner(eventName: string, listner: (arg: SyncedEventArgs) => void): void {
        if (!(eventName in this._listner)) {
            this._listner[eventName] = [];
        }

        this._listner[eventName].push(listner);
    }

}