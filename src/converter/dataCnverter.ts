import { DmcInfo } from "../../@types/net/hooks/types/dmcinfo.d.ts";
import { DmcinfoImpl } from "../../lib/net/types/impl/dmcinfo.ts";
import { TagImpl } from "../../lib/net/types/impl/tag.ts";
import { TargetImpl } from "../../lib/net/types/impl/target.ts";
import { Thumbinfoimpl } from "../../lib/net/types/impl/thumbinfo.ts";
import { DataApiData } from "../../lib/net/types/json/watchpage/dataApiData.ts";
import { AttemptResult, AttemptResultImpl } from "../../lib/utils/attemptResult.ts";

export interface DataConverter {

    /**
     * 視聴ページJSONをDmcInfoに変換する
     * @param rawData 視聴ページのJSON
     */
    convert(rawData: DataApiData): AttemptResult<DmcInfo>;
}

export class DataConverterImpl {

    public convert(rawData: DataApiData): AttemptResult<DmcInfo> {

        let info: DmcInfo;

        try {
            info = this.convertInternal(rawData);
        } catch (ex) {
            return new AttemptResultImpl(false, "視聴ページの解析に失敗しました。", null, ex as Error | null);
        }

        return new AttemptResultImpl(true, "", info);
    }

    private convertInternal(original: DataApiData): DmcInfo {
        const info = new DmcinfoImpl();

        //タイトル・ID
        info.Title = original.video?.title ?? "";
        info.Id = original.video?.id ?? "";

        if (original.video !== null) {

            //投稿日時
            if (original.video.registeredAt instanceof Date) {
                info.UploadedOn = original.video.registeredAt;
            } else {
                info.UploadedOn = new Date(Date.parse(original.video.registeredAt));
            }

            //サムネ
            info.ThumbInfo = new Thumbinfoimpl(original.video.thumbnail);

        }

        //投稿者
        info.Owner = original.owner?.nickname ?? "";
        info.OwnerID = original.owner?.id ?? 0;

        //タグ
        info.Tags = original.tag.items?.map(item => new TagImpl(item.isNicodicArticleExists, item.name)) ?? [];

        //再生回数・コメント数・マイリス数・いいね数
        info.ViewCount = original.video?.count.view ?? 0;
        info.CommentCount = original.video?.count.comment ?? 0;
        info.MylistCount = original.video?.count.mylist ?? 0;
        info.LikeCount = original.video?.count.like ?? 0;

        //コメント情報
        if (original.comment !== null) {
            info.CommentServer = original.comment.nvComment.server;
            info.Threadkey = original.comment.nvComment.threadKey;
            info.CommentLanguage = original.comment.nvComment.params.language;

            info.CommentTargets = [];
            for (const t of original.comment.nvComment.params.targets) {
                const target = new TargetImpl();
                target.Id = t.id;
                target.Fork=t.fork;

                info.CommentTargets.push(target);
            }
        }

        //ユーザー情報
        info.UserId = String(original.viewer?.id ?? 0);
        info.Userkey = original.comment?.keys.userKey ?? "";
        info.IsPremium = original.viewer?.isPremium ?? false;

        //サーバー情報
        info.IsPeakTime = original.system?.isPeakTime ?? false;

        //公式フラグ
        info.IsOfficial = original.channel !== null;

        //時間
        info.Duration = original.video?.duration ?? 0;

        //チャンネル情報
        info.ChannelID = original.channel?.id ?? "";
        info.ChannelName = original.channel?.name ?? "";

        //動画説明文
        info.Description = original.video?.description ?? "";
        info.Description = info.Description.replace(/<\/?.+? \/?>/g, "");


        //チャンネル情報
        info.ChannelID = original.channel?.id ?? "";
        info.ChannelName = original.channel?.name ?? "";


        //Session情報
        if (original.media !== null && original.media.delivery !== null) {


            //初期化
            info.SessionInfo.Audios.splice(0);
            info.SessionInfo.Videos.splice(0);

            info.SessionInfo.RecipeId = original.media.delivery.recipeId;
            info.SessionInfo.ContentId = original.media.delivery.movie?.contentId;
            info.SessionInfo.HeartbeatLifetime = original.media.delivery.movie?.session?.heartbeatLifetime ?? 0;
            info.SessionInfo.Token = original.media?.delivery.movie?.session?.token ?? "";
            info.SessionInfo.Signature = original.media?.delivery.movie?.session?.signature;
            info.SessionInfo.AuthType = original.media?.delivery.movie?.session?.authTypes?.http;
            info.SessionInfo.ContentKeyTimeout = original.media?.delivery.movie?.session?.contentKeyTimeout ?? 0;
            info.SessionInfo.PlayerId = original.media?.delivery.movie?.session?.playerId;
            info.SessionInfo.Priority = Math.floor((original.media?.delivery.movie?.session?.priority ?? 1) * 10) / 10;
            info.SessionInfo.Videos.push(...original.media.delivery.movie?.session?.videos);
            info.SessionInfo.Audios.push(...original.media.delivery.movie?.session?.audios);
            info.SessionInfo.ServiceUserId = original.media?.delivery.movie?.session?.serviceUserId;
            info.SessionInfo.TransferPriset = original.media?.delivery.movie?.session?.transferPresets[0] ?? "";
            info.IsDownloadable = original.media?.delivery.encryption === null;
        }
        else {
            info.IsDownloadable = false;
        }

        //暗号化動画の場合はダウンロード不可
        if (original.media?.delivery?.encryption !== null) {
            info.IsDownloadable = false;
            info.IsEncrypted = true;
        }

        return info;
    }
}