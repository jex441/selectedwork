
interface ICVItem {
    title: string | null;
    organization: string | null;
    location: string | null;
    startDate: string | null;
    endDate: string | null;
    bulletPoint1: string | null;
    bulletPoint2: string | null;
    bulletPoint3: string | null;
}

interface ICVSection {
    category: string;
    items: ICVItem[];
}

export interface ICVPage {
    id: number;
    userId: number | null;
    template: string | null;
    slug: string | null;
    imgSrc: string | null;
    imgCaption: string | null;
    sections: ICVSection[];
  }
  