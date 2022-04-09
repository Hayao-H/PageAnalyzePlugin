import { JsonUtils } from "../../utils/jsonUtils";
import { Message } from "./message";
import { ParamData, SyncedFunctionParameter } from "./parameter";

export class SyncedFunctionBase {

    //#region  private

    protected readonly functions: { [name: string]: (param: SyncedFunctionParameter) => void } = {};

    //#endregion

    //#region  Method

    /**
     * 別ランタイムから呼び出し可能な関数を登録します。
     * @param name 関数名
     * @param func 関数オブジェクト
     */
    public register(name: string, func: (param: SyncedFunctionParameter) => void): void {
        this.functions[name] = func;
    }

    //#endregion

    //#region private

    protected parse(parameter: string): [string | null, SyncedFunctionParameter | null] {
        const data: Message = JsonUtils.deserialize<Message>(parameter) as Message;

        if (!data.isSyncedFunction || data.name === undefined) {
            return [null, null];
        }

        const p = new SyncedFunctionParameter();
        p.params = data.params;

        return [data.name, p];
    }

    protected serialize(name: string, param: SyncedFunctionParameter): Message {
        const params: ParamData[] = param.params;
        const data: Message = {
            isSyncedFunction: true,
            name: name,
            params: params,
        };

        return data;
    }

    protected exists(name: string): boolean {
        return name in this.functions;
    }

    //#endregion

}