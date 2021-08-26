import { DmcInfo } from "../../../../@types/net/hooks/types/dmcinfo";
import { SessionInfo } from "../../../../@types/net/hooks/types/sessioninfo";
import { Thread } from "../../../../@types/net/hooks/types/thread";
import { Thumbinfo } from "../../../../@types/net/hooks/types/thumbinfo";
import { SessionInfoImpl } from "./sessioninfo";
import { Thumbinfoimpl } from "./thumbinfo";

export class DmcinfoImpl implements DmcInfo {
    Title = "";
    Id = "";
    Owner = "";
    OwnerID = 0;
    Userkey = "";
    UserId = "";
    ChannelID = "";
    ChannelName = "";
    Description = "";
    ViewCount = 0;
    CommentCount = 0;
    MylistCount = 0;
    LikeCount = 0;
    Duration = 0;
    Tags: string[] = [];
    IsDownloadable = false;
    IsEncrypted = false;
    IsOfficial = false;
    IsPeakTime = false;
    IsPremium = false;
    UploadedOn: Date = new Date();
    DownloadStartedOn: Date = new Date();
    SessionInfo: SessionInfo = new SessionInfoImpl();
    CommentThreads: Thread[] = [];
    ThumbInfo: Thumbinfo = new Thumbinfoimpl();
}