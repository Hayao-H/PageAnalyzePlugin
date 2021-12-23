/**
 * {@link Application}直下のlogプロパティのインターフェースです
 */
export interface Log {

    /**
     * エラー情報をログファイルに書き込みます
     * @param message エラーメッセージ
     */
    error(message: string): void;
}