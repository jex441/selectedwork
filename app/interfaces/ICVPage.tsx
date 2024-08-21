export interface ICVPage {
  id: number;
  pdf: string | null;
  userId: number | null;
  template: string | null;
  slug: string | null;
  imgSrc: string | null;
  imgCaption: string | null;
  education: [];
  soloExhibitions: [];
  groupExhibitions: [];
  awards: [];
  residencies: [];
  press: [];
  teaching: [];
  [key: string]: any;
}
