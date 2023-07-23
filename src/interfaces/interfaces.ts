export interface Iclient {
  counseleeName: string;
  counseleeId: string;
  start: string;
  inProgress: boolean;
  counselingDate: string;
  counselingTime: string;
  goal: string;
}

export interface IUser {
  id: number;
  name: string;
  code: string;
  role: string;
  refresh: string;
  access: string;
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
