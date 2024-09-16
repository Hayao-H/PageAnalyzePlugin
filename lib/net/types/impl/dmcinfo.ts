import { DmcInfo } from "../../../../@types/net/hooks/types/dmcInfo.d.ts";
import { SessionInfo } from "../../../../@types/net/hooks/types/sessionInfo.d.ts";
import { Tag } from "../../../../@types/net/hooks/types/tag.d.ts";
import { Target } from "../../../../@types/net/hooks/types/target.d.ts";
import { Thumbinfo } from "../../../../@types/net/hooks/types/thumbinfo.d.ts";
import { SessionInfoImpl } from "./sessioninfo.ts";
import { Thumbinfoimpl } from "./thumbinfo.ts";
import { DMSInfo } from "../../../../@types/net/hooks/types/dmsInfo.d.ts";
import { DMSInfoImpl } from "./dmsInfo.ts";

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
  TrackID = "";
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
  IsDMS = false;
  UploadedOn: Date = new Date();
  DownloadStartedOn: Date = new Date();
  SessionInfo: SessionInfo = new SessionInfoImpl();
  DmsInfo: DMSInfo = new DMSInfoImpl("", [], []);
  CommentTargets: Target[] = [];
  ThumbInfo: Thumbinfo = new Thumbinfoimpl();
}
