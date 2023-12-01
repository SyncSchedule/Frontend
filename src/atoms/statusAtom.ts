import moment from 'moment';
import { atom, atomFamily, useRecoilValue } from 'recoil';
import { Status } from '~/types/globalTypes';


export const statusListState = atom<Status[]>({
  key: 'statusListState',
  default: [
    {
      project_name: "오픈소스SW프로젝트",
      event_name: "주제 선정",
      date_range: [moment("2023-12-20"), moment("2023-12-21")],
      status_by_member: [
        {
          name: "동동일",
          selectedState: Array.from({ length: 2 }, () => Array.from({ length: 48 }, (_,i) => {
            if (i>9 && i<15) return true;
            else return false;
          })) 
        },
        {
          name: "동동이",
          selectedState: Array.from({ length: 2 }, () => Array.from({ length: 48 }, (_,i) => {
            if (i>12 && i<20) return true;
            else return false;
          })) 
        }
      ], 
      isFinished: false//not                                                               
    },
    {
      project_name: "졸업프로젝트",
      event_name: "중간 발표 자료 준비",
      date_range: [moment("2023-12-20"), moment("2023-12-21")],
      status_by_member: [
        {
          name: "김건국",
          selectedState: Array.from({ length: 2 }, () => Array.from({ length: 48 }, (_,i) => {
            if (i>12 && i<20) return true;
            else return false;
          })) 
        }
      ], 
      isFinished: false//done
    }, 
    {
      project_name: "UX 디자인",
      event_name: "화면 설계",
      date_range: [moment("2023-12-20"), moment("2023-12-21")],
      status_by_member: [
        {
          name: "김건국",
          selectedState: Array.from({ length: 2 }, () => Array.from({ length: 48 }, (_,i) => {
            if (i>14 && i<20) return true;
            else return false;
          })) 
        }, 
        {
          name: "김건덕",
          selectedState: Array.from({ length: 2 }, () => Array.from({ length: 48 }, (_,i) => {
            if (i>12 && i<18) return true;
            else return false;
          })) 
        },
        {
          name: "이쿠우",
          selectedState: Array.from({ length: 2 }, () => Array.from({ length: 48 }, (_,i) => {
            if (i>8 && i<16) return true;
            else return false;
          })) 
        },
        {
          name: "박건우",
          selectedState: Array.from({ length: 2 }, () => Array.from({ length: 48 }, (_,i) => {
            if (i>13 && i<19) return true;
            else return false;
          })) 
        }
      ], 
      isFinished: false//ready
    }, 
    {
      project_name: "UX 디자인",
      event_name: "주제 발표",
      date_range: [],
      status_by_member: [
        {
          name: "김건국",
          selectedState: []
        }, 
        {
          name: "김건덕",
          selectedState: []
        },
        {
          name: "이쿠우",
          selectedState: []
        },
        {
          name: "박건우",
          selectedState: []
        }
      ], 
      isFinished: true//finish
    }
  ]
});
