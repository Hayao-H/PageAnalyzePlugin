import { DMSInfo } from "../../../@types/net/hooks/types/dmsInfo.d.ts";
import { SessionInfo } from "../../../@types/net/hooks/types/sessioninfo.d.ts";
import {
  ContentSrcIdImpl,
  ContentSrcIdSetImpl,
  RequestImpl,
} from "../../../lib/net/types/impl/session/requestImpl.ts";
import {
  ContentSrcIdSet,
  Request,
} from "../../../lib/net/types/json/session/request.ts";
import { DMSRequest } from "./dmsRequest.ts";

export interface DataComposer {
  /**
   * Sessionサーバー用のデータを構築
   * @param sessionInfo
   */
  Create(sessionInfo: SessionInfo): Request;

  /**
   * DMSサーバー用のデータを構築
   * @param sessionInfo
   */
  CreateDMS(dmsInfo: DMSInfo): DMSRequest;
}

export class DataComposerImpl implements DataComposer {
  public Create(sessionInfo: SessionInfo): Request {
    const request = new RequestImpl();

    request.session.recipe_id = sessionInfo.RecipeId;
    request.session.content_id = sessionInfo.ContentId;
    request.session.content_type = "movie";
    request.session.timing_constraint = "unlimited";
    request.session.keep_method.heartbeat.lifetime =
      sessionInfo.HeartbeatLifetime;
    request.session.protocol.name = "http";
    request.session.protocol.parameters.http_parameters.parameters
      .hls_parameters.use_ssl = "yes";
    request.session.protocol.parameters.http_parameters.parameters
      .hls_parameters.use_well_known_port = "yes";
    request.session.protocol.parameters.http_parameters.parameters
      .hls_parameters.transfer_preset = sessionInfo.TransferPriset;
    request.session.protocol.parameters.http_parameters.parameters
      .hls_parameters.segment_duration = 6000;
    request.session.session_operation_auth.session_operation_auth_by_signature
      .signature = sessionInfo.Signature;
    request.session.session_operation_auth.session_operation_auth_by_signature
      .token = sessionInfo.Token;
    request.session.content_auth.auth_type = sessionInfo.AuthType;
    request.session.content_auth.service_id = "nicovideo";
    request.session.content_auth.content_key_timeout =
      sessionInfo.ContentKeyTimeout;
    request.session.content_auth.service_user_id = sessionInfo.ServiceUserId;
    request.session.client_info.player_id = sessionInfo.PlayerId;
    request.session.priority = sessionInfo.Priority;
    request.session.content_src_id_sets.push(
      this.GetContentSrcIDSets(sessionInfo),
    );

    return request;
  }

  public CreateDMS(dmsInfo: DMSInfo): DMSRequest {
    const request = new DMSRequest();

    for (const video of dmsInfo.videos.reverse()) {
      const filtered = dmsInfo.audios.filter((a) =>a.audioQualityLevel === video.audioQualityLevel);
      if (filtered.length === 0) {
        request.outputs.push([
          video.id,
          dmsInfo.audios.filter((a) => a.isAValiable)[0].id,
        ]);
      } else {
        request.outputs.push([
          video.id,
          filtered[0].id,
        ]);
      }
    }

    return request;
  }

  private GetContentSrcIDSets(sessionInfo: SessionInfo): ContentSrcIdSet {
    //sort後は archive_h264_360p,archive_h264_360p_low...になる
    const sorted: string[] = sessionInfo.Videos.sort((a, b) => {
      if (a.endsWith("_low")) return 1;
      if (b.endsWith("_low")) return -1;

      if (/.*_.*_\d+p/.test(a) && /.*_.*_\d+p/.test(b)) {
        a = a.slice(a.lastIndexOf("_"), -1);
        b = b.slice(b.lastIndexOf("_"), -1);
        return parseInt(b) - parseInt(a);
      } else {
        return 0;
      }
    });

    const audio = sessionInfo.Audios[0];
    const set = new ContentSrcIdSetImpl();

    for (let i = 0; i < sorted.length; i++) {
      const ids = new ContentSrcIdImpl();
      ids.src_id_to_mux.audio_src_ids.push(audio);

      //例えば、１周目ならi=0なのでj=0,2周目ならi=j=1なので最高画質はスキップ,3周目なら...
      for (let j = i; j < sorted.length; j++) {
        ids.src_id_to_mux.video_src_ids.push(sorted[j]);
      }

      set.content_src_ids.push(ids);
    }

    return set;
  }
}
