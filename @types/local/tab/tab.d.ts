/**
 * タブを操作できるハンドラ。
 * 必ずコード内で、タブを閉じるまで保持してください。
 */
export interface TabHandle {

    /**
     * タブを閉じます。
     * @returns 操作の成功を表す真偽値
     */
    close(): Promise<boolean>;

    /**
     * 引数で指定したhtmlをタブで表示します。
     * @param htmlContent タブに表示したいHtml形式のテキスト
     */
    navigateToString(htmlContent: string): Promise<void>;

    /**
     * タブ内にメッセージを送信します。\n
     * 詳しくは[こちら]{@link https://github.com/Hayao-H/NiconicomeAPIDesign/blob/main/accepted/tab/tab-api.md}
     * @param message 送信するメッセージ
     */
    postMessage(message: string): void;

    /**
     * タブ側から送信されたメッセージを処理するハンドラを追加します。\n
     * 詳しくは[こちら]{@link https://github.com/Hayao-H/NiconicomeAPIDesign/blob/main/accepted/tab/tab-api.md}
     * @param handler コールバック関数
     */
    addMessageHandler(handler: (message: string)=>void): void;
}

export interface Tab {

    /**
     * タイトルを指定してタブを追加
     * @param title タブのタイトル
     */
    add(title: string): Promise<TabHandle>;
}