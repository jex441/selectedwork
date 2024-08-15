import AccountForm from './AccountForm';
import { getUserData } from '@/app/lib/data';
import { IUser } from '../../../interfaces/IUser';
import BillingForm from './BillingForm';

export default async function page() {
  const userData: IUser | null = await getUserData();

  return (
  <main>
    <AccountForm data={userData} />
   <BillingForm data={userData} />
   </main>
   )
}
