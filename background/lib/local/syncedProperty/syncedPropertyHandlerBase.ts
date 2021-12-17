import { SyncedProperty } from "./syncedProperty";
import { TabHandle } from "../../../@types/local/tab/tab"
import { Message } from "./message";
import { Types } from "./types";


export class SyncedPropertyHandlerBase<T extends string | number | boolean>{
    //#region  field

    private readonly props: { [key: string]: SyncedProperty<T> } = {};


    //#endregion

    //#region  Methods

    /**
     * 指定した同期プロパティーを取得する
     * @param propertyName 同期プロパティー名
     * @returns 同期プロパティー
     */
    public getProperty(propertyName: string): SyncedProperty<T> {

        if (!this.exists(propertyName)) {
            throw new Error(`同期プロパティー{${propertyName}}は存在しません。`);
        }

        return this.props[propertyName];
    }

    /**
     * 指定した同期プロパティーが存在することを確認する
     * @param propertyName 同期プロパティー名
     * @returns 存在するかどうかを表す真偽値
     */
    public exists(propertyName: string): boolean {
        return propertyName in this.props;
    }

    /**
     * 同期プロパティーを追加する
     * @param propertyName 同期プロパティー名
     * @param initiqalValue 既定値
     * @returns 操作の成功・不成功を表す真偽値
     */
    public add(propertyName: string, initiqalValue: T): boolean {
        if (this.exists(propertyName)) {
            return false;
        }

        const p = new SyncedProperty<T>(initiqalValue, propertyName);
        this.props[propertyName] = p;
        p.subscribe(prop => this.postMessage(prop));

        return true;
    }

    /**
     * 同期プロパティーを削除する
     * @param propertyName 同期プロパティー名
     * @returns 操作の成功・不成功を表す真偽値
     */
    public remove(propertyName: string): boolean {
        if (!this.exists(propertyName)) {
            return false;
        }

        delete this.props[propertyName];

        return true;
    }

    //#endregion

    //#region  private
    protected postMessage(property: SyncedProperty<T>): void {
    }

    protected parse(data: string, dType: string): T {

        if (dType === Types.String) {
            return data as T;
        } else if (dType === Types.Boolean) {
            return (data === "true") as T;
        } else {
            return Number.parseInt(data) as T;
        }
    }

    protected stringify(property: SyncedProperty<T>): string {
        const message: Message = {
            syncedProperty: true,
            dataType: property.valueType,
            data: property.value.toString(),
            name: property.name,
        };

        return JSON.stringify(message);
    }

    //#endregion    
}