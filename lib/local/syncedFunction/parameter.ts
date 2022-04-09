import { JsonUtils } from "../../utils/jsonUtils";

export interface ParamData {

    readonly param: string;

    readonly name: string;
}

export class SyncedFunctionParameter {
    //#region  private

    private readonly innnerParams: ParamData[] = [];

    //#endregion

    //#region  props

    public get params(): ParamData[] {
        const ps: ParamData[] = this.innnerParams.map((p) => { return { name: p.name, param: p.param }; });

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
    public add<T>(name: string, param: T): void {

        if (this.exists(name)) return;


        const p: ParamData = { param: JsonUtils.serialize(param), name: name };
        this.innnerParams.push(p);

    }

    /**
     * 引数を取得します。
     * @param name 引数名
     * @returns 指定した引数
     * 警告:TypeScriptは実行時型情報をサポートしていないため、型付けはユーザーが登録する際の正確さに依存します。\n
     * 例えば、add()メソッドで正しく登録しなかった場合、実際にはstring型のデータをnumber型として返してしまう場合があります。
     */
    public get<T>(name: string): T | null {

        if (!this.exists(name)) {
            return null;
        }

        const p: ParamData | undefined = this.innnerParams.find(p => p.name === name);

        if (p === undefined) {
            return null;
        }

        let data: T;

        try {
            data = JsonUtils.deserialize<T>(p.param) as T;
        } catch {
            return null;
        }

        return data;

    }

    //#endregion

    //#region  private

    private exists(name: string): boolean {
        return this.innnerParams.some(p => p.name === name);
    }

    //#endregion
}