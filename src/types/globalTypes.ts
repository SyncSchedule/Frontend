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
  date?: Date;
  start?: Date; //시작 시간
  end?: Date; // 종료 시간
}
