import AccountForm from './AccountForm';
import { getUserData } from '@/app/lib/data';
import { IUser } from '../../../interfaces/IUser';

export default async function page() {
  const userData: IUser | null = await getUserData();

  return userData ? <AccountForm data={userData} /> : <div>error</div>;
}
