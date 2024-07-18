interface IMedia {
    type: string;
    main: boolean;
    url: string;
}
export interface Work  {
    title: string | null;
    year: string | null;
    medium: string | null;
    height: string | null;
    width: string | null;
    depth: string | null;
    unit: string | null;
    description: string | null;
    location: string | null;
    price: string | null;
    currency: string | null;
    sold: boolean | null;
    hidden: boolean;
    displayHeight: string | null;
    displayWidth: string | null;
    media: IMedia[];
}