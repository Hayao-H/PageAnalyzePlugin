export interface DMSInfo {
  accessRightKey: string;
  videos: VideoStream[];
  audios: AudioStream[];
}

export interface VideoStream {
  id: string;
  height: number;
  audioQualityLevel: number;
}

export interface AudioStream {
  id: string;
  audioQualityLevel: number;
  isAValiable: boolean;
}
