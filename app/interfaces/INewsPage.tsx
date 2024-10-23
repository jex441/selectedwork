import { IWorkshop } from './IWorkshop';

export interface INewsPage {
  id: number | null;
  template: string | null;
  // workshopId: string | null;
  heading: string | null;
  subHeading: string | null;
  body: string | null;
  imgSrc: string | null;
  slug: string | null;
  visibility: boolean;
  userId: number | null;
  posts: IWorkshop[] | [];
}
