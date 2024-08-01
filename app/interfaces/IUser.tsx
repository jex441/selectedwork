import { ICollection } from './ICollection';

export interface IUser {
  id: number | null;
  authId: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  email: string | null;
  plan: string | null;
  occupation: string | null;
  domain: string | null;
  url: string | null;
  collections: ICollection[];
}
