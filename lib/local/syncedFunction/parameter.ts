import { Types } from "../syncedProperty/types";
import { Utils } from "../../utils/utils";

export interface ParamData {

    readonly param: string;

    readonly type: string;

    readonly name: string;
}

export class SyncedFunctionParameter {
    //#region  private

    private readonly innnerParams: ParamData[] = [];

    //#endregion

    //#region  props

    public get params(): ParamData[] {
        const ps: ParamData[] = this.innnerParams.map((p) => { return { name: p.name, type: p.type, param: p.param }; });

        return ps;
    }

    public set params(params: ParamData[]) {
        params.forEach(p => this.innnerParams.push(p));
    }

    //#endregion

    //#region  Method

    /**
     * 引数を追加する
     * @param name 引数名
     * @param param 引数
     */
    public add<T extends string | number | boolean>(name: string, param: T): void {

        if (this.exists(name)) return;

        const t = typeof param;
        let tName = "";

        if (t === "number") {
            tName = Types.Number;
        } else if (t === "boolean") {
            tName = Types.Boolean;
        } else if (t === "string") {
            tName = Types.String;
        } else {
            throw new Error(`パラメーター型{${t}}はサポートされていません。`);
        }

        const p: ParamData = { param: param.toString(), type: tName, name: name };
        this.innnerParams.push(p);

    }

    /**
     * 引数を取得します。
     * @param name 引数名
     * @returns 指定した引数
     * 警告:TypeScriptは実行時型情報をサポートしていないため、型付けはユーザーが登録する際の正確さに依存します。\n
     * 例えば、add()メソッドで正しく登録しなかった場合、実際にはstring型のデータをnumber型として返してしまう場合があります。
     */
    public get<T extends string | number | boolean>(name: string): T | null {

        if (!this.exists(name)) {
            return null;
        }

        const p: ParamData | undefined = this.innnerParams.find(p => p.name === name);

        if (p === undefined) {
            return null;
        }

        const data: T = Utils.parse<T>(p.param, p.type);

        return data;

    }

    //#endregion

    //#region  private

    private exists(name: string): boolean {
        return this.innnerParams.some(p => p.name === name);
    }

    //#endregion
}