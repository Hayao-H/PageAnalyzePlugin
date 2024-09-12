import { DMSInfo } from "./dmsInfo.d.ts";
import { SessionInfo } from "./sessionInfo.d.ts";
import { Tag } from "./tag.d.ts";
import { Target } from "./target.d.ts";
import { Thumbinfo } from "./thumbinfo.d.ts";

export interface DmcInfo {
  Title: string;
  Id: string;
  Owner: string;
  OwnerID: number;
  UserId: string;
  ChannelID: string;
  ChannelName: string;
  Description: string;
  CommentServer: string;
  Threadkey: string;
  CommentLanguage: string;
  ViewCount: number;
  CommentCount: number;
  MylistCount: number;
  LikeCount: number;
  Duration: number;
  Tags: Tag[];
  IsDownloadable: boolean;
  IsEncrypted: boolean;
  IsOfficial: boolean;
  UploadedOn: Date;
  DownloadStartedOn: Date;
  SessionInfo: SessionInfo;
  DmsInfo: DMSInfo;
  CommentTargets: Target[];
  ThumbInfo: Thumbinfo;
  IsPremium: boolean;
  IsPeakTime: boolean;
  TrackID: string;
  IsDMS: boolean;
}
