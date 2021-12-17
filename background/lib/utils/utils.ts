import { Types } from "../local/syncedProperty/types";

export class Utils {
    public static parse<T extends string | number | boolean>(data: string, type: string): T {

        if (type === Types.String) {
            return data as T;
        } else if (type === Types.Boolean) {
            return (data === "true") as T;
        } else {
            return Number.parseInt(data) as T;
        }
    }
}