import { create } from "zustand";
import {IUser} from "../interfaces/IUser";

interface IState {
user: IUser;
setUserData: (data: IUser) => void;
}

export const useStore = create<IState>()((set) => ({
			user: {
				id: null,
                authId: "",
                firstName: "",
                lastName: "",
                occupation: "",
				username: "",
				email: "",
				plan: "",
                domain: "",
                url: "",
			},
			setUserData: (data: IUser) => set((state: IState) => {
    		let newState = { ...state, user: data };
    		return newState;
			})
		}));

