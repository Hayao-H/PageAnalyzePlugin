import { Thread } from "../../../../@types/net/hooks/types/thread";

export class ThreadImpl implements Thread {
    ID = 0;
    Fork = 0;
    IsActive = false;
    IsDefaultPostTarget = false;
    IsEasyCommentPostTarget = false;
    IsLeafRequired = false;
    IsOwnerThread = false;
    IsThreadkeyRequired = false;
    Threadkey: string | null = null;
    Is184Forced = false;
    HasNicoscript = false;
    Label = "";
    PostkeyStatus = 0;
    Server = "";
}