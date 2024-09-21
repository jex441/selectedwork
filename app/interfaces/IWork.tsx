export interface IMedia {
  id: number | null;
  type: string | null;
  main: string | null;
  url: string | null;
}
export interface IWork {
  id: number | null;
  idx: number;
  index: number | null;
  collectionId: number | null;
  title: string | null;
  year: string | null;
  medium: string | null;
  height: string | null;
  width: string | null;
  depth: string | null;
  unit: string | null;
  description: string | null;
  location: string | null;
  price: string | null;
  currency: string | null;
  sold: boolean | null;
  hidden: string | null;
  displayHeight: string | null;
  displayWidth: string | null;
  media: IMedia[];
}
