import { create } from "zustand";
import { combine } from 'zustand/middleware'
import {IUser} from "../interfaces/IUser";


export const useStore = create(combine({
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
}}, (set) => ({
			setUserData: (data: IUser) => set((state) => ({ user: state.user, ...data }))
		}
	)
)
)

