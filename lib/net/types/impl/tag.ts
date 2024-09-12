import { Tag } from "../../../../@types/net/hooks/types/tag.d.ts";

export class TagImpl implements Tag {
    
    constructor(isNicodicExist: boolean, name: string) {
        this.IsNicodicExist = isNicodicExist;
        this.Name = name;
    }

    IsNicodicExist;
    Name;
}