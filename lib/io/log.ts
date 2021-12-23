
export interface Logger {

    /**
     * 使用可能フラグ
     */
    get canUse(): boolean;

    /**
     * エラーを書き込む
     * @param message エラーメッセージ
     */
    error(message: string): void;

}

export class LoggerImpl implements Logger {

    public error(message: string): void {

        if (!this.canUse) throw new Error();
        application.log?.error(message);
    }

    public get canUse(): boolean {
        return application.log !== null;
    }

}