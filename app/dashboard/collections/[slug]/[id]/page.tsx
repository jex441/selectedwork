import {getUserWork} from "../../../../lib/data";
import PieceForm from "./pieceform";

export default async function Component({ params }: { params: { id: string } }) {
  const work = await getUserWork(params.id);
  return (
    <div className="mx-auto  h-full  items-center gap-6 py-6">
     {work && <PieceForm work={work} />}
    </div>
  );
}
