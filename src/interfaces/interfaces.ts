export interface IClient {
  id: number;
  name: string;
  code: string;
  start: string;
  progress: boolean;
  counselingDate: string;
  goal: string;
}

export interface IUser {
  id: number;
  name: string;
  code: string;
  role: string;
  refresh: string;
  access: string;
  partnerId?: string;
  accountId?: string;
}

export interface IEmotion {
  mainEmotion: string;
  subEmotion: string;
  feeling: number;
  intensity: number;
}

export interface IEmotionFull {
  emotions: IEmotion;
  details1: string | null;
  details2: string | null;
  details3: string | null;
}

export interface IRecord {
  date: string;
  emotions: IEmotion[];
  details1: string | null;
  details2: string | null;
  details3: string | null;
}

export interface ITimeTable {
  [key: string]: boolean[];
}

export interface IGraphRecord {
  date: string;
  emotions: IEmotion[];
}

export interface ICounselorProfile {
  name: string;
  contact: string;
  introduction: string;
}
