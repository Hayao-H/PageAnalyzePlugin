export interface SearchResult {
    total: number;
    items: SeatchItem[];
}

export interface SeatchItem {
    /**
     * 動画ID
     */
    ContentId: string;

    /**
     * 動画タイトル
     */
    Title: string;

    /**
     * 投稿日時
     */
    PostAt: Date;

    /**
     * 再生数
     */
    ViewCounter: number;

    /**
     * マイリスト数
     */
    MylistCounter: number;

    /**
     * コメント数
     */
    CommentCounter: number;

    /**
     * いいね数
     */
    LikeCounter: number;

    /**
     * 動画のサムネイルURL
     */
    ThumbnailUrl: string;

    /**
     * 動画の再生時間
     */
    LengthSeconds: number;
}
