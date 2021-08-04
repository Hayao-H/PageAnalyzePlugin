export interface AttemptResult<T> {

    /**
     * 成功フラグ
     */
    isSucceeded: boolean;

    /**
     * メッセージ
     */
    message: string;

    /**
     * 例外情報
     */
    exception: Error | null;

    /**
     * データ
     */
    data: T | null;

}

export class AttemptResultImpl<T> implements AttemptResult<T>{

    constructor(isSucceeded: boolean, message: string, data: T | null = null, exception: Error | null = null) {
        this.isSucceeded = isSucceeded;
        this.message = message;
        this.data = data;
        this.exception = exception;

    }

    /**
    * 成功フラグ
    */
    isSucceeded: boolean;

    /**
     * メッセージ
     */
    message: string;

    /**
     * 例外情報
     */
    exception: Error | null = null;

    /**
     * データ
     */
    data: T | null = null;
}