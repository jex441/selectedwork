import AccountForm from './AccountForm';
import { getUserData } from '@/app/lib/data';
import { IUser } from '../../../interfaces/IUser';
import BillingForm from './BillingForm';
import AccountStatusForm from './AccountStatusForm';
import DomainForm from './DomainForm';
import TemplateForm from './TemplateForm';
import FaviconForm from './FaviconForm';

export default async function page() {
  const userData: IUser | null = await getUserData();

  return (
    <main className="flex min-h-screen w-full flex-col gap-5 px-4 py-10 md:px-20">
      {userData && <AccountForm data={userData} />}
      {userData && <FaviconForm data={userData} />}
      {userData && <TemplateForm data={userData} />}
      {userData && <DomainForm data={userData} />}
      {userData && <BillingForm data={userData} />}
      {userData && <AccountStatusForm data={userData} />}
    </main>
  );
}
