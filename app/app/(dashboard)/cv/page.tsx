import { getCVPageData } from '@/app/lib/data';
import CvForm from './cvform';

export default async function Component() {
  const data = await getCVPageData();
  return (
    <div className="flex h-full w-full flex-row">
      {data && <CvForm data={data} />}
    </div>
  );
}
