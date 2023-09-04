import { Thumbinfo } from "../../../../@types/net/hooks/types/thumbinfo";
import { Thumbnail } from "../json/watchpage/dataApiData";
import { Thumbnail as APIThumb } from "../json/api/watch/v3/api";

export class Thumbinfoimpl implements Thumbinfo {

    constructor();
    constructor(thumbnail: Thumbnail);
    constructor(thumbnail: APIThumb);
    constructor(thumbnail?: Thumbnail | APIThumb | null) {
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