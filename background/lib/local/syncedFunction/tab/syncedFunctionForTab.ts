import { SyncedFunctionParameter } from "../parameter";
import { SyncedFunctionBase } from "../syncedFunctionBase";

export class SyncedFunctionForTab extends SyncedFunctionBase {

    public constructor() {
        super();
        this.subscribeCall();
    }

    //#region  Methods

    /**
     * バックグラウンド側の関数を呼び出します。
     * @param name 関数名
     * @param parameter 引数
     */
    public call(name: string, parameter: SyncedFunctionParameter) {
        const message = this.serialize(name,parameter);
        window.chrome.webview.postMessage(message);
    }

    //#endregion

    //#region private

    private subscribeCall(): void {
        window.chrome.webview.addEventListener('message', message => this.onMessage(message));
    }

    private onMessage(message: string): void {
        const [name, param] = this.parse(message);

        if (name === null || param === null) {
            return;
        }

        if (!this.exists(name)) return;

        this.functions[name](param);

    }

    //#endregion
}