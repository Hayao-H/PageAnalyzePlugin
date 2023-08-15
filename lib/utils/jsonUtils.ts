export class JsonUtils {

    /**
     * JSON文字列をデシリアライズ
     * @param source JSON
     * @returns JSONからデシリアライズされたオブジェクト
     */
    public static deserialize<T>(source: string): T {
        return JSON.parse(source, (key, value) => {
            if (typeof (value) == "string" &&
                (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/) || value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}$/))) {
                return new Date(Date.parse(value));
            }
            return value;
        });
    }

    /**
     * オブジェクトをJSON文字列にシリアライズする
     * @param data オブジェクト
     * @returns JSON形式にシリアライズされた文字列
     */
    public static serialize<T>(data: T): string {
        return JSON.stringify(data);
    }
}