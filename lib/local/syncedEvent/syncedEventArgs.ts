export class SyncedEventArgs {
    constructor(data: unknown) {
        this.data = data;
    }

    /**
     * イベントデータ
     */
    public readonly data: unknown;
}