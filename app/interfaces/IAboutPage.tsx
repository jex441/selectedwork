interface IAboutLink {
  'about-link-text': string | null;
  'about-link-url': string | null;
}

interface IAboutText {
  id: number | null;
  'about-text': string | null;
  'about-heading': string | null;
  'about-subheading': string | null;
  'about-links': IAboutLink[] | null;
}

interface IAboutImage {
  id: number | null;
  src: string | null;
  caption: string | null;
}

export interface IAboutPage {
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
  linkSrc3: string | null;
  linkText3: string | null;
  imgSrc: string | null;
  imgCaption: string | null;
}
