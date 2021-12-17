import { Thread } from "../../../../@types/net/hooks/types/thread";

export class ThreadImpl implements Thread {
    ID: number = 0;
    Fork: number = 0;
    IsActive: boolean = false;
    IsDefaultPostTarget: boolean = false;
    IsEasyCommentPostTarget: boolean = false;
    IsLeafRequired: boolean = false;
    IsOwnerThread: boolean = false;
    IsThreadkeyRequired: boolean = false;
    Threadkey: string | null = null;
    Is184Forced: boolean = false;
    HasNicoscript: boolean = false;
    Label: string = "";
    PostkeyStatus: number = 0;
    Server: string = "";
}