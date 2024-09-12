import { SessionInfo } from "../../../../@types/net/hooks/types/sessioninfo.d.ts";

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
    KeyURL: string | null = null;
    EncryptedKey: string | null = null;
    Videos: string[] = [""];
    Audios: string[] = [""];
}