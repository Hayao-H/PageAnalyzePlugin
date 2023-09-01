export declare interface Response {

    /**
     * リクエストの成功状態
     * ```typescript
     * if (!response.ok){
     *  //エラー処理
     * }
     * ```
     */
    get ok(): boolean;

    /**
     * HTTPステータスコード
     * see https://developer.mozilla.org/ja/docs/Web/HTTP/Status
     */
    get status(): number;

    /**
     * レスポンスを文字列として取得
     * ``` typescript
     * content:string = await response.text();
     * ```
     */
    text(): Promise<string>;

}