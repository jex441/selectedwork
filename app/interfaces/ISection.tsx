import {ISectionAttribute} from "./ISectionAttribute"

export interface ISection {
    id: number;
    pageId: number;
    type: string;
    title: string;
    order: number;
    attributes: ISectionAttribute[];
  }