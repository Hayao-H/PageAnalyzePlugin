import { Thumbinfo } from "../../../../@types/net/hooks/types/thumbinfo.d.ts";
import { Thumbnail } from "../json/watchpage/dataApiData.ts";
import { Thumbnail as APIThumb } from "../json/api/watch/v3/api.ts";

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