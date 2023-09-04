export interface WatchAPIV3 {
    data: Data
}

export interface Data {
    channel: Channel | null;
    client: Client
    comment: Comment
    media: Media | null;
    owner: Owner | null;
    system: System
    tag: Tag
    video: Video
    viewer: Viewer
}

export interface Channel {
    id: string
    name: string
    isOfficialAnime: boolean
    isDisplayAdBanner: boolean
}

export interface Follow {
    isFollowed: boolean
    isBookmarked: boolean
    token: string
    tokenTimestamp: number
}

export interface Client {
    nicosid: string
    watchId: string
    watchTrackId: string
}

export interface Comment {
    nvComment: NvComment
}

export interface NvComment {
    threadKey: string
    server: string
    params: Params
}

export interface Params {
    targets: Target[]
    language: string
}

export interface Target {
    id: string
    fork: string
}

export interface Media {
    delivery: Delivery | null;
}

export interface Delivery {
    recipeId: string
    encryption: Encryption | null;
    movie: Movie
    trackingId: string
}

export interface Encryption {
    encryptedKey: string
    keyUri: string
}

export interface Movie {
    contentId: string
    session: Session
}

export interface Session {
    recipeId: string
    playerId: string
    videos: string[]
    audios: string[]
    protocols: string[]
    authTypes: AuthTypes
    serviceUserId: string
    token: string
    signature: string
    contentId: string
    heartbeatLifetime: number
    contentKeyTimeout: number
    priority: number
    transferPresets: string[]
}

export interface AuthTypes {
    http: string
    hls: string
}

export interface Owner {
    id: number
    nickname: string
}

export interface System {
    serverTime: string
    isPeakTime: boolean
}

export interface Tag {
    items: Item[]
}

export interface Item {
    name: string
    isCategory: boolean
    isCategoryCandidate: boolean
    isNicodicArticleExists: boolean
    isLocked: boolean
}

export interface Video {
    id: string
    title: string
    description: string
    count: Count
    duration: number
    thumbnail: Thumbnail
    registeredAt: Date
    isPrivate: boolean
    isDeleted: boolean
    isNoBanner: boolean
    isAuthenticationRequired: boolean
    isEmbedPlayerAllowed: boolean
    isGiftAllowed: boolean
}

export interface Count {
    view: number
    comment: number
    mylist: number
    like: number
}

export interface Thumbnail {
    url: string
    middleUrl: string | null
    largeUrl: string | null
    player: string | null
    ogp: string | null
}

export interface Viewer {
    id: number
    nickname: string
    isPremium: boolean
    allowSensitiveContents: boolean
}

