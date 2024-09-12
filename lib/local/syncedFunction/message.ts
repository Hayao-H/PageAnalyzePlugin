import { ParamData } from "./parameter.ts";

export interface Message {

    /**
     * Syncedfunctionであるかどうか
     */
    isSyncedFunction: boolean;

    /**
     * 関数名
     */
    name: string;

    /**
     * パラメーター
     */
    params: ParamData[];

}