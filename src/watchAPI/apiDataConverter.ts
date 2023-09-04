import { DmcInfo } from "../../@types/net/hooks/types/dmcinfo";
import { DmcinfoImpl } from "../../lib/net/types/impl/dmcinfo";
import { TagImpl } from "../../lib/net/types/impl/tag";
import { TargetImpl } from "../../lib/net/types/impl/target";
import { Thumbinfoimpl } from "../../lib/net/types/impl/thumbinfo";
import { WatchAPIV3 } from "../../lib/net/types/json/api/watch/v3/api";
import { AttemptResult, AttemptResultImpl } from "../../lib/utils/attemptResult";

export interface APIDataConverter {
    Convert(source: WatchAPIV3): AttemptResult<DmcInfo>;
}

export class APIDataConverterImpl implements APIDataConverter {
    public Convert(source: WatchAPIV3): AttemptResult<DmcInfo> {

        try {
            return new AttemptResultImpl(true, "", this.ConvertInternal(source));
        } catch (ex: any) {
            return new AttemptResultImpl(false, `APIデータの変換に失敗しました。(詳細：${ex.message})`);
        }
    }

    private ConvertInternal(source: WatchAPIV3): DmcInfo {

        const info = new DmcinfoImpl();

        info.DownloadStartedOn = new Date();

        //タイトル
        info.Title = source.data.video.title;

        //動画情報
        info.Id = source.data.video.id;
        info.Description = source.data.video.description;
        info.Duration = source.data.video.duration;
        info.Tags = source.data.tag.items.map(t => new TagImpl(t.isNicodicArticleExists, t.name));
        info.UploadedOn = source.data.video.registeredAt;

        //投稿者
        info.Owner = source.data.owner?.nickname ?? source.data.channel?.name ?? "";
        info.OwnerID = source.data.owner?.id ?? 0;

        //ユーザー情報
        info.UserId = source.data.viewer.id.toString();
        info.IsPremium = source.data.viewer.isPremium;
        info.IsPeakTime = source.data.system.isPeakTime;

        //チャンネル情報
        info.ChannelID = source.data.channel?.id ?? "";
        info.ChannelName = source.data.channel?.name ?? "";
        info.IsOfficial = source.data.channel !== null;

        //コメント関連
        info.CommentServer = source.data.comment.nvComment.server;
        info.Threadkey = source.data.comment.nvComment.threadKey;
        info.CommentLanguage = source.data.comment.nvComment.params.language;
        source.data.comment.nvComment.params.targets.forEach(t => {
            const target = new TargetImpl();
            target.Fork = t.fork;
            target.Id = t.id;
            info.CommentTargets.push(target);
        });

        //再生回数・コメント数・マイリス数・いいね数
        info.ViewCount = source.data.video.count.view;
        info.CommentCount = source.data.video.count.comment;
        info.MylistCount = source.data.video.count.mylist;
        info.LikeCount = source.data.video.count.like;

        //サムネ
        info.ThumbInfo = new Thumbinfoimpl(source.data.video.thumbnail);

        //動画関連
        info.IsEncrypted = source.data.media?.delivery?.encryption !== null;

        if (!info.IsEncrypted && source.data.media !== null && source.data.media.delivery !== null) {
            info.IsDownloadable = true;
            info.SessionInfo.RecipeId = source.data.media.delivery.recipeId;
            info.SessionInfo.ContentId = source.data.media.delivery.movie.contentId;
            info.SessionInfo.HeartbeatLifetime = source.data.media.delivery.movie.session.heartbeatLifetime;
            info.SessionInfo.Token = source.data.media.delivery.movie.session.token;
            info.SessionInfo.Signature = source.data.media.delivery.movie.session.signature;
            info.SessionInfo.AuthType = source.data.media.delivery.movie.session.authTypes.hls;
            info.SessionInfo.ContentKeyTimeout = source.data.media.delivery.movie.session.contentKeyTimeout;
            info.SessionInfo.ServiceUserId = source.data.media.delivery.movie.session.serviceUserId;
            info.SessionInfo.PlayerId = source.data.media.delivery.movie.session.playerId;
            info.SessionInfo.TransferPriset = source.data.media.delivery.movie.session.transferPresets[0];
            info.SessionInfo.Videos = source.data.media.delivery.movie.session.videos;
            info.SessionInfo.Audios = source.data.media.delivery.movie.session.audios;
            info.SessionInfo.Priority = source.data.media.delivery.movie.session.priority;

        } else {
            info.IsDownloadable = false;
        }

        return info;
    }
}