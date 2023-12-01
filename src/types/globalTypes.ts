import { Moment } from "moment";

export type Project = {
  name: string;
  introduction: string;
  members: {
    name: string;
    isLeader: boolean;
  }[];
  isOngoing: boolean;
  code?: string;
  events: Event[]
}

export type Event = {
  name: string;
  isScheduled?: boolean;
  date?: Moment;
  start?: Moment; //시작 시간
  end?: Moment; // 종료 시간
  contents?:string; //내용
}
