import { ClientInfo, ContentSrcId, ContentSrcIdSet, Heartbeat, HlsParameters, HttpParameters, KeepMethod, Parameters, Protocol, ProtocolParameters, Request, Session, SessionOperationAuth, SessionOperationAuthBySignature, SrcIdToMux } from "../../json/session/request";

export class RequestImpl implements Request {
    session = new SessionImpl();
}

export class SessionImpl implements Session {
    recipe_id = "";
    content_id = "";
    content_type = "";
    content_src_id_sets: ContentSrcIdSetImpl[] = [];
    timing_constraint = "";
    keep_method = new KeepMethodImpl();
    protocol = new ProtocolImpl();
    content_uri = "";
    session_operation_auth = new SessionOperationAuthImpl();
    content_auth = new ContentAuthImpl();
    client_info = new ClientInfoImpl();
    priority = 0;
}

export class ContentSrcIdSetImpl implements ContentSrcIdSet {
    content_src_ids: ContentSrcIdImpl[] = [];
}

export class ContentSrcIdImpl implements ContentSrcId {
    src_id_to_mux = new SrcIdToMuxImpl();
}

export class SrcIdToMuxImpl implements SrcIdToMux {
    video_src_ids: string[] = [];
    audio_src_ids: string[] = [];
}

export class KeepMethodImpl implements KeepMethod {
    heartbeat = new HeartbeatImpl();
}

export class HeartbeatImpl implements Heartbeat {
    lifetime = 0;
}

export class ProtocolImpl implements Protocol {
    name = "";
    parameters = new ProtocolParametersImpl();
}

export class ProtocolParametersImpl implements ProtocolParameters {
    http_parameters = new HttpParametersImpl();
}

export class HttpParametersImpl implements HttpParameters {
    parameters = new ParametersImpl();
}

export class ParametersImpl implements Parameters {
    hls_parameters = new HlsParametersImpl();
}

export class HlsParametersImpl implements HlsParameters {
    use_well_known_port = "";
    use_ssl = "";
    transfer_preset = "";
    segment_duration = 0;
}

export class SessionOperationAuthImpl implements SessionOperationAuth {
    session_operation_auth_by_signature = new SessionOperationAuthBySignatureImpl();
}

export class SessionOperationAuthBySignatureImpl implements SessionOperationAuthBySignature {
    token = "";
    signature = "";
}

export class ContentAuthImpl implements ContentAuthImpl {
    auth_type = "";
    content_key_timeout = 0;
    service_id = "";
    service_user_id = "";
}

export class ClientInfoImpl implements ClientInfo {
    player_id = "";
}
