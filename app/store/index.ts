import { create } from 'zustand';
import { IUser } from '../interfaces/IUser';

interface IState {
  user: IUser;
  setUserData: (data: IUser) => void;
}

export const useStore = create<IState>()((set) => ({
  user: {
    id: 99,
    displayName: '',
    authId: '',
    firstName: '',
    lastName: '',
    occupation: '',
    username: '',
    email: '',
    plan: '',
    domain: '',
    url: '',
    pages: [],
    collections: [],
  },
  setUserData: (data: IUser) =>
    set((state) => ({
      user: { ...state.user, ...data },
    })),
}));
