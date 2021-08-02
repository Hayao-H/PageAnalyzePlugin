import { SessionInfo } from "../../../../@types/net/hooks/types/sessioninfo";

export class SessionInfoImpl implements SessionInfo {
    RecipeId: string = "";
    ContentId: string = "";
    HeartbeatLifetime: number = 0;
    Token: string = "";
    Signature: string = "";
    AuthType: string = "";
    ContentKeyTimeout: number = 0;
    ServiceUserId: string = "";
    PlayerId: string = "";
    TransferPriset: string = "";
    Priority: number = 0;
    Videos: string[] = [""];
    Audios: string[] = [""];
}