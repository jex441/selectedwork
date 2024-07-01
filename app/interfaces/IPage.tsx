import { ISection } from './ISection';

export interface IPage {
    id: number | null;
    userId: number | null;
    template: string | null;
    title: string | null;
    sections: ISection[] | null;
  }
  