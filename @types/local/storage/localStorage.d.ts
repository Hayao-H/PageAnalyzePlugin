export interface LocalStorage {
    /**
     * キーを指定してアイテムを保存します。
     * 保存に失敗した場合には例外がスローされます。
     * @param key キー
     * @param value 値
     */
    setItem(key: string, value: string): void;

    /**
     * アイテムを取得します。
     *キーが存在しない場合は null が返ります。
     * @param key キー
     */
    getItem(key: string): string | null;

    /**
     * 指定したキーに一致するアイテムを削除します。
     * 指定したキーが存在しない場合には何も行いません。
     * @param key 
     */
    removeItem(key: string): void;

    /**
     * すべてのデータを削除します。
     */
    clear(): void;
}