import { Thumbinfo } from "../../../../@types/net/hooks/types/thumbinfo";
import { Thumbnail } from "../json/watchpage/dataApiData";

export class Thumbinfoimpl implements Thumbinfo {

    constructor();
    constructor(thumbnail: Thumbnail);
    constructor(thumbnail?: Thumbnail | null) {
        this.large = thumbnail?.largeUrl ?? null;
        this.middle = thumbnail?.middleUrl ?? null;
        this.normal = thumbnail?.url ?? null;
        this.player = thumbnail?.player ?? null;
    }

    large: string | null = null;

    middle: string | null = null;

    normal: string | null = null;

    player: string | null = null;

}