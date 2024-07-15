import { getUserData, user } from './lib/data';
import { IUser } from './interfaces/IUser';

import Home from './home';

export default async function Component() {
  let userData: IUser = {
    id: null,
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
  };
  let res = await getUserData();
  if (res !== null) userData = res;

  return <Home userData={userData} />;
}
