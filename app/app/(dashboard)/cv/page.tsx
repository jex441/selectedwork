import { getCVPageData } from '@/app/lib/data';
import CvForm from './cvform';

export default async function Component() {
  const data = await getCVPageData('CV');
  return (
    <div className="flex h-full flex-row ">
      {data && <CvForm data={data} />}
    </div>
  );
}
