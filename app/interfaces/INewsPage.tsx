import { INewsPost } from './INewsPost';

export interface INewsPage {
  id: number | null;
  template: string | null;
  // newsId: string | null;
  heading: string | null;
  subHeading: string | null;
  body: string | null;
  imgSrc: string | null;
  slug: string | null;
  visibility: boolean;
  userId: number | null;
  posts: INewsPost[] | [];
}
