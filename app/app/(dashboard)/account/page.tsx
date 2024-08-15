import AccountForm from './AccountForm';
import { getUserData } from '@/app/lib/data';
import { IUser } from '../../../interfaces/IUser';
import BillingForm from './BillingForm';
import AccountStatusForm from './AccountStatusForm';
import DomainForm from './DomainForm';

export default async function page() {
  const userData: IUser | null = await getUserData();
  console.log(userData);
  return (
    <main className="flex min-h-screen flex-col gap-5 px-20 py-10">
      {userData && <AccountForm data={userData} />}
      {userData && <DomainForm data={userData} />}
      {userData && <BillingForm data={userData} />}
      {userData && <AccountStatusForm data={userData} />}
    </main>
  );
}
