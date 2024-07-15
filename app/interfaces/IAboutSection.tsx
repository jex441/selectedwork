export interface IAboutSection {
    id: number | null;
    pageId: number | null;
    type: string | null;
    order: number | null;
    'about-text': string | null;
    'about-heading': string | null;
    'about-image': string | null;
    [key: string]: any;
  }