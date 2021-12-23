import { SessionInfo } from "../../../../@types/net/hooks/types/sessioninfo";

export class SessionInfoImpl implements SessionInfo {
    RecipeId = "";
    ContentId = "";
    HeartbeatLifetime = 0;
    Token = "";
    Signature = "";
    AuthType = "";
    ContentKeyTimeout = 0;
    ServiceUserId = "";
    PlayerId = "";
    TransferPriset = "";
    Priority = 0;
    Videos: string[] = [""];
    Audios: string[] = [""];
}