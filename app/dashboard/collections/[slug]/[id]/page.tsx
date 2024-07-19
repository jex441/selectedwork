import { getUserWork } from '../../../../lib/data';
import PieceForm from './pieceform';

export default async function Component({
  params,
}: {
  params: { id: string };
}) {
  const work = params.id && (await getUserWork(params.id));
  console.log(work);
  return (
    <div className="mx-auto  h-full  items-center gap-6 py-6">
      {work && <PieceForm work={work} />}
    </div>
  );
}
