export interface IContactPage {
  id: number;
  userId: number | null;
  template: string | null;
  title: string | null;
  slug: string | null;
  heading: string | null;
  subheading: string | null;
  text: string | null;
  linkSrc1: string | null;
  linkText1: string | null;
  linkSrc2: string | null;
  linkText2: string | null;
  imgSrc: string | null;
  imgCaption: string | null;
  instagram: string | null;
  email: string | null;
}
