import { atom, atomFamily } from 'recoil';
import { Project } from '~/types/globalTypes';

export const projectState = atomFamily<Project, string>({
  key: 'projectState',
  default: (name) => {
    return {
      name: name,
      introduction: "",
      members: [],
      isOngoing: true,
      events: []
    }
  }
})

export const projectListState = atom<Project[]>({
  key: 'projectListState',
  default: [
    {
      name: "UX 디자인",
      introduction: "UX 디자인 팀입니다.",
      members: [
        { name: "김건국", isLeader: true },
        { name: "김건덕", isLeader: false },
        { name: "이쿠우", isLeader: false },
        { name: "박건우", isLeader: false },
      ],
      isOngoing: true,
      events: [
        {
          name: "화면 설계 회의",
          isScheduled: false
        },
        {
          name: "주제 발표 준비",
          isScheduled: true,
          date: new Date(2023, 9, 15),
          start: new Date(2023, 11, 15, 13),
          end: new Date(2023, 11, 15, 15)
        },
        {
          name: "중간 발표 준비",
          isScheduled: true,
          date: new Date(2023, 10, 15),
          start: new Date(2023, 11, 15, 13),
          end: new Date(2023, 11, 15, 15)
        },
        {
          name: "최종 발표 준비",
          isScheduled: true,
          date: new Date(2023, 11, 5),
          start: new Date(2023, 11, 15, 14),
          end: new Date(2023, 11, 15, 16),
          contents: "1. 약속 조율 + 프로젝트 중점적으로, 캘린더 확정된 해당 날짜 누르면 내용 작성할 수 있게끔\n\ta. 일정 조율 - 언제만나 앱 참고 → 확정시 장소 기입\n\tb. 확정시키면 확정된 일정 볼 수 있는 캘린더\n\tc. 해당 날짜 클릭하면 회의 내용 작성, 조회할 수 있도록\n\td. 해당 날짜 다가오면 알림"
        },
      ]
    },
    {
      name: "오픈소스SW프로젝트",
      introduction: "UX 디자인 팀입니다.",
      members: [
        { name: "동동일", isLeader: true },
        { name: "동동이", isLeader: false },
        { name: "동동삼", isLeader: false },
        { name: "동동사", isLeader: false },
        { name: "동동오", isLeader: false },
      ],
      isOngoing: true,
      events: [
        {
          name: "최종 발표 문서 작성",
          isScheduled: true,
          date: new Date(2023, 11, 3),
          start: new Date(2023, 11, 15, 14),
          end: new Date(2023, 11, 15, 16)
        },
      ]
    },
    {
      name: "전공기초프로젝트1",
      introduction: "UX 디자인 팀입니다.",
      members: [
        { name: "라이언", isLeader: true },
        { name: "제이지", isLeader: false },
        { name: "단무지", isLeader: false },
      ],
      isOngoing: false,
      events: [
        {
          name: "주제 발표 준비",
          isScheduled: true,
          date: new Date(2023, 9, 15),
          start: new Date(2023, 11, 15, 13),
          end: new Date(2023, 11, 15, 15)
        },
      ]
    }
  ]
})
