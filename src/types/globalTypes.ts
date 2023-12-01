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
  isScheduled?: boolean;//true이면 date, start, end 존재
  date?: Moment;
  start?: Moment; //시작 시간
  end?: Moment; // 종료 시간
}

export type Status = {
  project_name: string;
  event_name: string;
  date_range: Moment[];
  status_by_member: {
    name: string;
    selectedState: boolean[][];
  }[];
  isFinished: boolean;
}
