import {IWork} from './IWork';

export interface ICollection {
    id: number;
    title: string | null;
    slug: string | null;
    template: string | null;
    heading: string | null;
    subheading: string | null;
    imgSrc: string | null;
    imgCaption: string | null;
    userId: number | null;
    works: IWork[];
    createdAt: Date;
    updatedAt: Date;
    }