import { IPage } from './IPage';

export interface IUser {
    id: number | null;
    authId: string | null;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    email: string | null;
    plan: string | null;
    occupation: string | null;
    domain: string | null;
    url: string | null;
    pages: IPage[] | null;
  }