import {ISectionAttribute} from "./ISectionAttribute"

export interface ISection {
    id: number | null;
    pageId: number | null;
    type: string | null;
    order: number | null;
    attributes: ISectionAttribute[] | null;
  }