import { DmcInfo } from "../../@types/net/hooks/types/dmcinfo.d.ts";
import { DmcinfoImpl } from "../../lib/net/types/impl/dmcinfo.ts";
import {
  AudioStreamImpl,
  VideoStreamImpl,
} from "../../lib/net/types/impl/dmsInfo.ts";
import { TagImpl } from "../../lib/net/types/impl/tag.ts";
import { TargetImpl } from "../../lib/net/types/impl/target.ts";
import { Thumbinfoimpl } from "../../lib/net/types/impl/thumbinfo.ts";
import { WatchAPISimple } from "../../lib/net/types/json/api/watch/simple/api.ts";
import { Data} from "../../lib/net/types/json/api/watch/simple/api.ts";
import {
  AttemptResult,
  AttemptResultImpl,
} from "../../lib/utils/attemptResult.ts";

export interface APIDataConverter {
  Convert(source: WatchAPISimple): AttemptResult<DmcInfo>;
}

export class APIDataConverterImpl implements APIDataConverter {
  public Convert(source: WatchAPISimple): AttemptResult<DmcInfo> {
    try {
      return new AttemptResultImpl(true, "", this.ConvertInternal(source.data.response));
    } catch (ex: unknown) {
      if (ex instanceof Error) {
        return new AttemptResultImpl(
          false,
          `APIデータの変換に失敗しました。(詳細：${ex.message})`,
        );
      } else {
        return new AttemptResultImpl(
          false,
          "APIデータの変換に失敗しました。",
        );
      }
    }
  }

  private ConvertInternal(source: Data): DmcInfo {
    const info = new DmcinfoImpl();

    info.DownloadStartedOn = new Date();

    //タイトル
    info.Title = source.video.title;

    //動画情報
    info.Id = source.video.id;
    info.Description = source.video.description;
    info.Duration = source.video.duration;
    info.Tags = source.tag.items.map((t) =>
      new TagImpl(t.isNicodicArticleExists, t.name)
    );
    info.UploadedOn = source.video.registeredAt;

    //投稿者
    info.Owner = source.owner?.nickname ?? source.channel?.name ?? "";
    info.OwnerID = source.owner?.id ?? 0;

    //ユーザー情報
    info.UserId = source.viewer.id.toString();
    info.IsPremium = source.viewer.isPremium;
    info.IsPeakTime = source.system.isPeakTime;
    info.TrackID = source.videoAds.additionalParams.watchTrackId;

    //チャンネル情報
    info.ChannelID = source.channel?.id ?? "";
    info.ChannelName = source.channel?.name ?? "";
    info.IsOfficial = source.channel !== null;

    //コメント関連
    info.CommentServer = source.comment.nvComment.server;
    info.Threadkey = source.comment.nvComment.threadKey;
    info.CommentLanguage = source.comment.nvComment.params.language;
    source.comment.nvComment.params.targets.forEach((t) => {
      const target = new TargetImpl();
      target.Fork = t.fork;
      target.Id = t.id;
      info.CommentTargets.push(target);
    });

    //再生回数・コメント数・マイリス数・いいね数
    info.ViewCount = source.video.count.view;
    info.CommentCount = source.video.count.comment;
    info.MylistCount = source.video.count.mylist;
    info.LikeCount = source.video.count.like;

    //サムネ
    info.ThumbInfo = new Thumbinfoimpl(source.video.thumbnail);

    if (source.media !== null) {
      if (source.media.delivery !== null) {
        info.IsDownloadable = true;
        info.SessionInfo.RecipeId = source.media.delivery.recipeId;
        info.SessionInfo.ContentId = source.media.delivery.movie.contentId;
        info.SessionInfo.HeartbeatLifetime =
          source.media.delivery.movie.session.heartbeatLifetime;
        info.SessionInfo.Token = source.media.delivery.movie.session.token;
        info.SessionInfo.Signature =
          source.media.delivery.movie.session.signature;
        info.SessionInfo.AuthType =
          source.media.delivery.movie.session.authTypes.hls;
        info.SessionInfo.ContentKeyTimeout =
          source.media.delivery.movie.session.contentKeyTimeout;
        info.SessionInfo.ServiceUserId =
          source.media.delivery.movie.session.serviceUserId;
        info.SessionInfo.PlayerId =
          source.media.delivery.movie.session.playerId;
        if (
          source.media.delivery.movie.session.transferPresets.length > 0
        ) {
          info.SessionInfo.TransferPriset =
            source.media.delivery.movie.session.transferPresets[0];
        } else {
          info.SessionInfo.TransferPriset = "";
        }
        info.SessionInfo.Videos =
          source.media.delivery.movie.session.videos;
        info.SessionInfo.Audios =
          source.media.delivery.movie.session.audios;
        info.SessionInfo.Priority =
          source.media.delivery.movie.session.priority;
      }

      if (source.media.domand !== null) {
        info.IsDownloadable = true;
        info.IsDMS = true;
        info.DmsInfo.accessRightKey = source.media.domand.accessRightKey;
        info.DmsInfo.videos = source.media.domand.videos.map((v) =>
          new VideoStreamImpl(
            v.id,
            v.height,
            v.recommendedHighestAudioQualityLevel,
          )
        );
        info.DmsInfo.audios = source.media.domand.audios.map((a) =>
          new AudioStreamImpl(a.id, a.qualityLevel, a.isAvailable)
        );
      }
    } else {
      info.IsDownloadable = false;
    }

    return info;
  }
}
