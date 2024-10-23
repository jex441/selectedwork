import { IWorkshop } from './IWorkshop';

export interface IWorkshopsPage {
  id: number | null;
  template: string | null;
  // classesId: string | null;
  heading: string | null;
  subHeading: string | null;
  body: string | null;
  imgSrc: string | null;
  slug: string | null;
  visibility: boolean;
  userId: number | null;
  workshops: IWorkshop[] | [];
}
