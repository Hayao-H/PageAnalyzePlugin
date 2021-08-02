import { DmcInfo } from "../../../../@types/net/hooks/types/dmcinfo";
import { SessionInfo } from "../../../../@types/net/hooks/types/sessioninfo";
import { Thread } from "../../../../@types/net/hooks/types/thread";
import { Thumbinfo } from "../../../../@types/net/hooks/types/thumbinfo";
import { SessionInfoImpl } from "./sessioninfo";
import { Thumbinfoimpl, Thumbnailimpl } from "./thumbinfo";

export class DmcinfoImpl implements DmcInfo {
    Title: string = "";
    Id: string = "";
    Owner: string = "";
    OwnerID: number = 0;
    Userkey: string = "";
    UserId: string = "";
    ChannelID: string = "";
    ChannelName: string = "";
    Description: string = "";
    ViewCount: number = 0;
    CommentCount: number = 0;
    MylistCount: number = 0;
    LikeCount: number = 0;
    Duration: number = 0;
    Tags: string[] = [];
    IsDownloadable: boolean = false;
    IsEncrypted: boolean = false;
    IsOfficial: boolean = false;
    UploadedOn: Date = new Date();
    DownloadStartedOn: Date = new Date();
    SessionInfo: SessionInfo = new SessionInfoImpl();
    CommentThreads: Thread[] = [];
    ThumbInfo: Thumbinfo = new Thumbinfoimpl(new Thumbnailimpl());
}