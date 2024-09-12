import { AudioStream, DMSInfo, VideoStream } from "../../../../@types/net/hooks/types/dmsInfo.d.ts";

export class DMSInfoImpl implements DMSInfo {
  constructor(
    public accessRightKey: string,
    public videos: VideoStream[],
    public audios: AudioStream[],
  ) {}
}

export class VideoStreamImpl implements VideoStream {
  constructor(
    public id: string,
    public height: number,
    public audioQualityLevel: number,
  ) {}
}

export class AudioStreamImpl implements AudioStream {
  constructor(
    public id: string,
    public audioQualityLevel: number,
    public isAValiable: boolean,
  ) {}
}
