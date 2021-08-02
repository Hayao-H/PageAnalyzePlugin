import { Thumbinfo } from "../../../../@types/net/hooks/types/thumbinfo";
import { Thumbnail } from "../json/watchpage/dataApiData";

export class Thumbinfoimpl implements Thumbinfo {

    large: string | null = null;

    middle: string | null = null;

    normal: string | null = null;

    player: string | null = null;


    constructor(thumbnail: Thumbnail) {
        this.large = thumbnail.largeUrl;
        this.middle = thumbnail.middleUrl;
        this.normal = thumbnail.url;
        this.player = thumbnail.player;
    }
}

export class Thumbnailimpl implements Thumbnail {

    url: string = "";

    middleUrl: string = "";

    largeUrl: string = "";

    player: string = "";

    ogp: string = "";
}