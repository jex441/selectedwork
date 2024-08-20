import { getUserWork } from '../../../../../lib/data';
import PieceForm from './pieceform';

export default async function Component({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const work = params.id && (await getUserWork(parseInt(params.id)));
  return (
    <div className="mx-auto  flex  h-full items-start ">
      {work && <PieceForm work={work} slug={params.slug} />}
    </div>
  );
}
