import { atom } from 'recoil';
import { User } from '~/types/globalTypes';

export const UserState = atom<User>({
    key:'UserState',
    default:{
        name: '김건국',
         email:'konkuk@gmail.com'
    }
})