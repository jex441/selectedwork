import { IAboutSection } from './IAboutSection';

export interface IAboutPage {
    id: number | null;
    userId: number | null;
    template: string | null;
    title: string | null;
    sections: IAboutSection[] | null;
  }
  