import { DmcInfo } from "../../../../@types/net/hooks/types/dmcinfo";
import { SessionInfo } from "../../../../@types/net/hooks/types/sessioninfo";
import { Tag } from "../../../../@types/net/hooks/types/tag";
import { Target } from "../../../../@types/net/hooks/types/target";
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
    CommentServer = "";
    Threadkey = "";
    CommentLanguage = "";
    ViewCount = 0;
    CommentCount = 0;
    MylistCount = 0;
    LikeCount = 0;
    Duration = 0;
    Tags: Tag[] = [];
    IsDownloadable = false;
    IsEncrypted = false;
    IsOfficial = false;
    IsPeakTime = false;
    IsPremium = false;
    UploadedOn: Date = new Date();
    DownloadStartedOn: Date = new Date();
    SessionInfo: SessionInfo = new SessionInfoImpl();
    CommentTargets: Target[] = [];
    ThumbInfo: Thumbinfo = new Thumbinfoimpl();
}