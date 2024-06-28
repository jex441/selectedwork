import { create } from "zustand";
import {IUser} from "../interfaces/IUser";

interface IStore {
user: IUser;
setUserData: (data: IUser) => void;
}
export const useStore = create<IStore>((set) =>({
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
			setUserData: (data: IUser) => set({ user: data }),
		}));

