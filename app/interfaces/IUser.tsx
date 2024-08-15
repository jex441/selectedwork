import { ICollection } from './ICollection';
import { IPage } from './IPage';
export interface IUser {
  id: number;
  authId: string;
  displayName: string;
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string | null;
  plan: string | null;
  occupation: string | null;
  domain: string | null;
  url: string | null;
  collections: ICollection[] | null;
  pages: IPage[] | null;
  customerId: string | null;
  subscriptionId: string | null;
}
