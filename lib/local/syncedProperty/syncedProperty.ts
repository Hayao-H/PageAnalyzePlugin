import { Types } from "./types";

export class SyncedProperty<T extends string | number | boolean> {

    constructor(initialData: T, name: string) {
        this.internalValue = initialData;
        this.handlers = [];
        this.signalHandlers = [];
        this.internalName = name;
        this.internalValueType = this.getValueType(initialData);
    }

    //#region  fields

    private internalValue: T;

    private subscriptionFlag = true;

    private readonly handlers: ((newValue: SyncedProperty<T>) => void)[];

    private readonly signalHandlers: ((newValue: SyncedProperty<T>) => void)[];

    private readonly internalName: string;

    private readonly internalValueType: string;

    //#endregion


    //#region Props

    /**
     * 変数名を取得する
     */
    public get name(): string {
        return this.internalName;
    }

    /**
     * 値を設定する
     */
    public set value(val: T) {
        this.internalValue = val;

        this.handlers.forEach(callback => callback(this));
        
        if (this.subscriptionFlag) {
            this.signalHandlers.forEach(callback => callback(this));
        } else {
            this.subscriptionFlag = true;
        }
    }

    /**
     * 値を取得する
     */
    public get value(): T {
        return this.internalValue;
    }

    /**
     * 値の方を取得する
     */
    public get valueType(): string {
        return this.internalValueType;
    }

    //#endregion

    //#region  Methods

    /**
     * 値の変更を購読する
     * @param callback 変更時のコールバック関数
     */
    public subscribe(callback: (newValue: SyncedProperty<T>) => void): void;
    public subscribe(callback: (newValue: SyncedProperty<T>) => void, isSignal: boolean): void;
    public subscribe(callback: (newValue: SyncedProperty<T>) => void, isSignal?: boolean): void {
        if (isSignal) {
            this.signalHandlers.push(callback);
        } else {
            this.handlers.push(callback);
        }
    }

    public cancelSubscriptionOnce(): void {
        this.subscriptionFlag = false;
    }

    //#endregion

    //#region  private

    private getValueType(value: T): string {
        const t = typeof value;

        if (t === "boolean") {
            return Types.Boolean;
        } else if (t === "number") {
            return Types.Number;
        } else {
            return Types.String;
        }
    }

    //#endregion

}