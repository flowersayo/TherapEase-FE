export interface Iclient {
  counseleeName: string;
  counseleeId: string;
  start: string;
  inProgress: boolean;
  counselingDate: string;
  counselingTime: string;
  goal: string;
}

export interface IEmotion {
  mainEmotion: string;
  subEmotion: string;
  feeling: number;
  intensity: number;
}

export interface IRecord {
  emotions: IEmotion[];
  details1: string | null;
  details2: string | null;
  details3: string | null;
}
