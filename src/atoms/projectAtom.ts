import moment from 'moment';
import { atom, atomFamily } from 'recoil';
import { Project } from '~/types/globalTypes';

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
          name: "화면 설계",
          isScheduled: false
        },
        {
          name: "주제 발표",
          isScheduled: true,
          date: moment("2023-11-15"),
          start: moment("2023-11-15 13"),
          end: moment("2023-11-15 15"),
        }, 
        // {
        //   name: "최종 발표 준비",
        //   isScheduled: true,
        //   date: moment("2023-12-15"),
        //   start: moment("2023-12-15 13"),
        //   end: moment("2023-12-15 15"),
        // }
      ]
    },
    {
      name: "오픈소스SW프로젝트",
      introduction: "오픈소스SW프로젝트 2팀입니다.",
      members: [
        { name: "동동일", isLeader: true },
        { name: "동동이", isLeader: false },
        { name: "동동삼", isLeader: false },
        { name: "동동사", isLeader: false },
        { name: "김건국", isLeader: false },
      ],
      isOngoing: true,
      events: [
        {
          name: "주제 선정",
          isScheduled: false,
        }
      ]
    },
    {
      name: "졸업프로젝트",
      introduction: "졸업프로젝트 팀입니다.",
      members: [
        { name: "라이언", isLeader: true },
        { name: "김건국", isLeader: false },
        { name: "단무지", isLeader: false },
      ],
      isOngoing: false,
      events: [
        {
          name: "중간 발표 자료 준비",
          isScheduled: true,
          date: moment("2023-11-15"),
          start: moment("2023-11-15 13"),
          end: moment("2023-11-15 15"),
        }
      ]
    }
  ]
})
