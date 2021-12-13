export class ResourceHandler {

    /**
     * キーを登録して取得できるようにします
     * @param key 任意のキー
     * @param relativePath resourceフォルダーからの相対パス
     */
    public register(key: string, relativePath: string): void {
        this.resourceKeys[key] = relativePath;
    }

    /**
     * register()メソッドで登録したキーでリソースを取得します
     * @param key 登録したキー
     * @param cache キャッシュを有効にするかどうか。2回目以降にこの引数がtrueであった場合は、キャッシュを返します。
     * @returns リソース
     */
    public getResource(key: string, cache = true): string | null {
        if (!(key in this.resourceKeys)) return null;

        if (cache && key in this.caches) {
            return this.caches[key];
        }

        const data: string | null = application.resource?.getResource(this.resourceKeys[key]) ?? null;

        if (cache && data !== null) {
            this.caches[key] = data;
        }

        return data;
    }

    private resourceKeys: { [key: string]: string } = {};

    private caches: { [key: string]: string } = {};
}