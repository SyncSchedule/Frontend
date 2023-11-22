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
  key:'projectListState',
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
      events: []
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
      events: []
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
      events: []
    }
  ]
})
