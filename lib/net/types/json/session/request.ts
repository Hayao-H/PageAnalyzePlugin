export interface Request {
    session: Session
  }
  
  export interface Session {
    recipe_id: string
    content_id: string
    content_type: string
    content_src_id_sets: ContentSrcIdSet[]
    timing_constraint: string
    keep_method: KeepMethod
    protocol: Protocol
    content_uri: string
    session_operation_auth: SessionOperationAuth
    content_auth: ContentAuth
    client_info: ClientInfo
    priority: number
  }
  
  export interface ContentSrcIdSet {
    content_src_ids: ContentSrcId[]
  }
  
  export interface ContentSrcId {
    src_id_to_mux: SrcIdToMux
  }
  
  export interface SrcIdToMux {
    video_src_ids: string[]
    audio_src_ids: string[]
  }
  
  export interface KeepMethod {
    heartbeat: Heartbeat
  }
  
  export interface Heartbeat {
    lifetime: number
  }
  
  export interface Protocol {
    name: string
    parameters: ProtocolParameters
  }
  
  export interface ProtocolParameters {
    http_parameters: HttpParameters
  }
  
  export interface HttpParameters {
    parameters: Parameters
  }
  
  export interface Parameters {
    hls_parameters: HlsParameters
  }
  
  export interface HlsParameters {
    use_well_known_port: string
    use_ssl: string
    transfer_preset: string
    segment_duration: number
  }
  
  export interface SessionOperationAuth {
    session_operation_auth_by_signature: SessionOperationAuthBySignature
  }
  
  export interface SessionOperationAuthBySignature {
    token: string
    signature: string
  }
  
  export interface ContentAuth {
    auth_type: string
    content_key_timeout: number
    service_id: string
    service_user_id: string
  }
  
  export interface ClientInfo {
    player_id: string
  }
  