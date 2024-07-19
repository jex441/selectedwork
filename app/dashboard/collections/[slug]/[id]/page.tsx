import {getUserWork} from "../../../../lib/data";
import PieceForm from "./pieceform";

export default async function Component({ params }: { params: { id: string } }) {
  const work = await getUserWork(params.id);
  return (
    <div className="lg:gap-2.52 mx-auto grid h-full max-w-6xl items-center gap-6 py-6 md:grid-cols-2">
     {work && <PieceForm work={work} />}
    </div>
  );
}
