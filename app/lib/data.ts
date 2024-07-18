'use server';

import { currentUser, auth } from '@clerk/nextjs/server';
import { eq, and, inArray } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';

import {
  users,
  pages,
  about,
  contact,
  cv,
  cvSection,
  work,
  NewUser,
  collection,
  InsertPage,
  InsertWork,
  media,
} from '../db/schema';
import { IUser } from '../interfaces/IUser';
import { IAboutPage } from '../interfaces/IAboutPage';
import { ICVPage } from '../interfaces/ICVPage';
import { revalidatePath } from 'next/cache';
import { ICollection } from '../interfaces/ICollection';

const FormSchema = z.object({
  id: z.number(),
  template: z.string(),
  heading: z
    .string()
    .max(100, { message: 'Must be fewer than 100 characters.' })
    .nullish(),
  subheading: z
    .string()
    .max(100, { message: 'Must be fewer than 100 characters.' })
    .nullish(),
  text: z
    .string()
    .max(1_000_000, { message: 'Must be fewer than 1000000 characters.' })
    .nullish(),
  linkSrc1: z
    .string({ invalid_type_error: 'Please use a valid url.' })
    .url()
    .nullish(),
  linkText1: z
    .string()
    .max(100, { message: 'Must be fewer than 100 characters.' })
    .nullish(),
  linkSrc2: z
    .string({ invalid_type_error: 'Please use a valid url.' })
    .url()
    .nullish(),
  linkText2: z
    .string()
    .max(100, { message: 'Must be fewer than 100 characters.' })
    .nullish(),
  imgSrc: z.string().url().nullish(),
  imgCaption: z
    .string()
    .max(100, { message: 'Must be fewer than 100 characters.' })
    .nullish(),
});

export type State = {
  errors?: {
    template?: string[];
    heading?: string[];
    subheading?: string[];
    text?: string[];
    linkText1?: string[];
    linkSrc1?: string[];
    linkText2?: string[];
    linkSrc2?: string[];
    imgSrc?: string[];
  };
  message?: string | null;
};

export const user = async () => {
  const currentUser = auth();

  const data =
    currentUser !== null &&
    currentUser.userId !== null &&
    (await db.select().from(users).where(eq(users.authId, currentUser.userId)));

  if (data) {
    return data[0];
  }
};

const UpdateAbout = FormSchema.omit({
  id: true,
});

export async function updateAbout(
  id: number,
  prevState: {},
  formData: FormData,
) {
  const validatedFields = UpdateAbout.safeParse({
    template: formData.get('template') || '',
    text: formData.get('text') || null,
    heading: formData.get('heading') || null,
    subheading: formData.get('subheading') || null,
    linkSrc1: formData.get('linkSrc1') || null,
    linkText1: formData.get('linkText1') || '',
    linkSrc2: formData.get('linkSrc2') || null,
    linkText2: formData.get('linkText2') || '',
    imgSrc: formData.get('imgSrc') || null,
    imgCaption: formData.get('imgCaption') || '',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const {
    template,
    text,
    heading,
    subheading,
    linkSrc1,
    linkText1,
    linkSrc2,
    linkText2,
    imgSrc,
    imgCaption,
  } = validatedFields.data;

  const update = await db
    .update(about)
    .set({
      template: template,
      text: text,
      heading: heading,
      subheading: subheading,
      linkSrc1: linkSrc1,
      linkText1: linkText1,
      linkSrc2: linkSrc2,
      linkText2: linkText2,
      imgSrc: imgSrc,
      imgCaption: imgCaption,
    })
    .where(eq(about.id, id))
    .returning({ id: about.id });

  return { success: true };
}

const ContactFormSchema = z.object({
  id: z.number(),
  template: z.string(),
  heading: z
    .string()
    .max(100, { message: 'Must be fewer than 100 characters.' })
    .nullish(),
  subheading: z
    .string()
    .max(100, { message: 'Must be fewer than 100 characters.' })
    .nullish(),
  text: z
    .string()
    .max(1_000_000, { message: 'Must be fewer than 1000000 characters.' })
    .nullish(),
  linkSrc1: z
    .string({ invalid_type_error: 'Please use a valid url.' })
    .url()
    .nullish(),
  linkText1: z
    .string()
    .max(100, { message: 'Must be fewer than 100 characters.' })
    .nullish(),
  linkSrc2: z
    .string({ invalid_type_error: 'Please use a valid url.' })
    .url()
    .nullish(),
  linkText2: z
    .string()
    .max(100, { message: 'Must be fewer than 100 characters.' })
    .nullish(),
  imgSrc: z.string().url().nullish(),
  imgCaption: z
    .string()
    .max(100, { message: 'Must be fewer than 100 characters.' })
    .nullish(),
  instagram: z
    .string({ invalid_type_error: 'Please use a valid url.' })
    .url()
    .nullish(),
  facebook: z
    .string({ invalid_type_error: 'Please use a valid url.' })
    .url()
    .nullish(),
  twitter: z
    .string({ invalid_type_error: 'Please use a valid url.' })
    .url()
    .nullish(),
  tiktok: z
    .string({ invalid_type_error: 'Please use a valid url.' })
    .url()
    .nullish(),
  linkedin: z
    .string({ invalid_type_error: 'Please use a valid url.' })
    .url()
    .nullish(),
});

export type ContactState = {
  errors?: {
    template?: string[];
    heading?: string[];
    subheading?: string[];
    text?: string[];
    linkText1?: string[];
    linkSrc1?: string[];
    linkText2?: string[];
    linkSrc2?: string[];
    imgSrc?: string[];
    instagram?: string[];
    facebook?: string[];
    twitter?: string[];
    tiktok?: string[];
    linkedin?: string[];
  };
  message?: string | null;
};

const UpdateContact = ContactFormSchema.omit({
  id: true,
});

export async function updateContactPage(
  id: number,
  prevState: {},
  formData: FormData,
) {
  const validatedFields = UpdateContact.safeParse({
    template: formData.get('template') || '',
    text: formData.get('text') || null,
    heading: formData.get('heading') || null,
    subheading: formData.get('subheading') || null,
    linkSrc1: formData.get('linkSrc1') || null,
    linkText1: formData.get('linkText1') || '',
    linkSrc2: formData.get('linkSrc2') || null,
    linkText2: formData.get('linkText2') || '',
    imgSrc: formData.get('imgSrc') || null,
    imgCaption: formData.get('imgCaption') || '',
    instagram: formData.get('instagram') || null,
    facebook: formData.get('facebook') || null,
    twitter: formData.get('twitter') || null,
    tiktok: formData.get('tiktok') || null,
    linkedin: formData.get('linkedin') || null,
  });

  if (!validatedFields.success) {
    console.log('error!', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const {
    template,
    text,
    heading,
    subheading,
    linkSrc1,
    linkText1,
    linkSrc2,
    linkText2,
    imgSrc,
    imgCaption,
    instagram,
  } = validatedFields.data;

  const update = await db
    .update(contact)
    .set({
      template: template,
      text: text,
      heading: heading,
      subheading: subheading,
      linkSrc1: linkSrc1,
      linkText1: linkText1,
      linkSrc2: linkSrc2,
      linkText2: linkText2,
      imgSrc: imgSrc,
      imgCaption: imgCaption,
      instagram: instagram,
    })
    .where(eq(contact.id, id))
    .returning({ id: contact.id });
  return { success: true };
}

export const getUserData = async () => {
  const auth = await currentUser();

  if (auth !== null) {
    const rows = await db
      .select()
      .from(users)
      .where(eq(users.authId, auth.id))
      .leftJoin(pages, eq(users.id, pages.userId));

    const result = rows.reduce<IUser>((acc, row) => {
      const user = row.users_table;
      const page = row.pages_table;

      if (!acc.id && user.id) {
        acc = { ...user, pages: [] };
      }
      if (page) {
        acc.pages.push(page);
      }
      return acc;
    }, {} as IUser);
    return result;
  }

  return null;
};

export const insertUser = async (
  authId: string,
  firstName: string,
  lastName: string,
  plan: string,
  email: string,
) => {
  let userId: number;

  const newUser: NewUser = {
    authId: authId,
    username: firstName + lastName,
    email: email,
    firstName: firstName,
    lastName: lastName,
    plan: 'free',
  };

  let res = await db.insert(users).values(newUser).returning({ id: users.id });

  userId = res[0].id;

  let defaultPages = [
    { template: 'a1', slug: 'about', title: 'About', userId: userId },
    { template: 'c1', slug: 'contact', title: 'Contact', userId: userId },
    { template: 'h1', slug: 'home', title: 'Home', userId: userId },
    { template: 'g1', slug: 'work', title: 'Selected Work', userId: userId },
    { template: 'r1', slug: 'cv', title: 'CV', userId: userId },
  ];

  const insertPages = async (defaultPages: InsertPage[]) => {
    await db.insert(pages).values(defaultPages);
  };

  await insertPages(defaultPages);
};

export const getPageData = async (title: string) => {
  const userData = await user();
  const rows =
    userData &&
    userData.id !== null &&
    (await db
      .select()
      .from(about)
      .where(and(eq(about.title, title), eq(about.userId, userData?.id))));

  if (rows) return rows[0];
};

export const getContactPageData = async (title: string) => {
  const userData = await user();
  const rows =
    userData &&
    userData.id !== null &&
    (await db
      .select()
      .from(contact)
      .where(and(eq(contact.title, title), eq(contact.userId, userData?.id))));
  if (rows) return rows[0];
};

export const getCVPageData = async (title: string) => {
  const userData = await user();
  const rows =
    userData &&
    userData.id !== null &&
    (await db
      .select()
      .from(cv)
      .where(and(eq(cv.title, title), eq(cv.userId, userData?.id)))
      .leftJoin(cvSection, eq(cvSection.cvId, cv.id)));
  const result =
    rows &&
    rows.reduce<ICVPage>((acc, row) => {
      const cv = row.cv_table;
      const section = row.cv_section_table;
      if (!acc.id && cv.id) {
        acc = {
          ...cv,
          education: [],
          groupExhibitions: [],
          soloExhibitions: [],
          awards: [],
          residencies: [],
          press: [],
          teaching: [],
        };
      }
      if (section) {
        let category = section.categoryId;
        let sectionData = { ...section, unsaved: false, bulletPoints: [] };
        section.bulletPoint1 &&
          sectionData.bulletPoints.push(section.bulletPoint1 as never);
        section.bulletPoint2 &&
          sectionData.bulletPoints.push(section.bulletPoint2 as never);
        section.bulletPoint3 &&
          sectionData.bulletPoints.push(section.bulletPoint3 as never);
        category && acc[category].push(sectionData);
      }
      return acc;
    }, {} as ICVPage);
  if (rows) return result;
};

export const deleteCVSection = async (id: number) => {
  return await db.delete(cvSection).where(eq(cvSection.id, id));
};

export const deleteCVSectionBulletPoint = async (
  id: number,
  bulletPointIndex: number,
) => {
  const bulletPointKey = `bulletPoint${bulletPointIndex + 1}`;
  return await db
    .update(cvSection)
    .set({ [bulletPointKey]: null })
    .where(eq(cvSection.id, id));
};
export const saveCVSections = async (
  sections: {
    unsaved: boolean;
    categoryId: string;
    id: number | null;
    category: string;
    title: string;
    organization: string;
    location: string;
    startDate: string;
    endDate: string;
    bulletPoints: string[];
  }[],
) => {
  const userData = await user();
  const userCV =
    userData && (await db.select().from(cv).where(eq(cv.userId, userData?.id)));

  sections.map(async (section) => {
    if (section.id !== null) {
      await db
        .update(cvSection)
        .set({
          title: section.title,
          organization: section.organization,
          location: section.location,
          startDate: section.startDate,
          endDate: section.endDate,
          bulletPoint1: section.bulletPoints[0],
          bulletPoint2: section.bulletPoints[1],
          bulletPoint3: section.bulletPoints[2],
        })
        .where(eq(cvSection.id, section.id));
    } else {
      userCV &&
        (await db.insert(cvSection).values({
          categoryId: section.categoryId,
          category: section.category,
          title: section.title,
          organization: section.organization,
          location: section.location,
          startDate: section.startDate,
          endDate: section.endDate,
          bulletPoint1: section.bulletPoints[0],
          bulletPoint2: section.bulletPoints[1],
          bulletPoint3: section.bulletPoints[2],
          cvId: userCV[0].id,
        }));
    }
  });
  revalidatePath('/dashboard/cv');
};

export type WorkState = {
  errors?: {
    title?: string;
    medium?: string;
    year?: string;
    description?: string;
    height?: string;
    width?: string;
    depth?: string;
    unit?: string;
    price?: string;
    location?: string;
    currency?: string;
    sold?: boolean;
    images?: string[];
  };
  message?: string | null;
};

const CreateWorkSchema = z.object({
  userCollection: z.string(),
  title: z
    .string()
    .max(100, { message: 'Must be fewer than 100 characters.' })
    .nullish(),
  year: z
    .string()
    .max(4, { message: 'Must be fewer than 4 characters.' })
    .nullish(),
  description: z
    .string()
    .max(1_000_000, { message: 'Must be fewer than 1,000,000 characters.' })
    .nullish(),
  medium: z
    .string()
    .max(100, { message: 'Must be fewer than 100 characters.' })
    .nullish(),
  location: z
    .string()
    .max(50, { message: 'Must be fewer than 50 characters.' })
    .nullish(),
  sold: z.string().nullish(),
  height: z
    .string()
    .max(10, { message: 'Must be fewer than 10 characters.' })
    .nullish(),
  width: z
    .string()
    .max(10, { message: 'Must be fewer than 10 characters.' })
    .nullish(),
  depth: z
    .string()
    .max(10, { message: 'Must be fewer than 10 characters.' })
    .nullish(),
  unit: z
    .string()
    .max(10, { message: 'Must be fewer than 10 characters.' })
    .nullish(),
  price: z
    .string()
    .max(7, { message: 'Must be fewer than 7 characters.' })
    .nullish(),
  currency: z
    .string()
    .max(3, { message: 'Must be fewer than 3 characters.' })
    .nullish(),
  mediaUrls: z.array(z.string()),
});

export const createWork = async (
  slug: string,
  prevState: {},
  formData: FormData,
) => {
  const user = await getUserData();

  const validatedFields = CreateWorkSchema.safeParse({
    userCollection: formData.get('collection') || 'work',
    title: formData.get('title') || '',
    medium: formData.get('medium') || '',
    year: formData.get('year') || '',
    description: formData.get('description') || '',
    height: formData.get('height') || '',
    width: formData.get('width') || '',
    depth: formData.get('depth') || '',
    unit: formData.get('unit') || '',
    price: formData.get('price') || '',
    currency: formData.get('currency') || '',
    location: formData.get('location') || '',
    sold: formData.get('sold') || 'false',
    mediaUrls: formData.getAll('mediaUrls'),
  });
  if (!validatedFields.success) {
    console.log('error!', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Work.',
    };
  }
  const {
    userCollection,
    title,
    medium,
    year,
    description,
    height,
    width,
    depth,
    unit,
    price,
    currency,
    location,
    sold,
    mediaUrls,
  } = validatedFields.data;

  const userCollectionData =
    user &&
    user.id !== null &&
    (await db
      .select()
      .from(collection)
      .where(
        and(
          eq(collection.slug, userCollection),
          eq(collection.userId, user.id),
        ),
      ));

  const newWork =
    user &&
    user.id !== null &&
    (await db
      .insert(work)
      .values({
        collectionId: userCollectionData[0].id,
        userId: user.id,
        title: title,
        medium: medium,
        year: year,
        description: description,
        height: height,
        width: width,
        depth: depth,
        unit: unit,
        price: price,
        currency: currency,
        location: location,
        sold: sold,
        hidden: 'false',
      })
      .returning({ id: work.id }));

  newWork &&
    newWork[0].id !== null &&
    validatedFields.data.mediaUrls.map(async (cur: string) => {
      await db
        .insert(media)
        .values({ url: cur, type: 'image', workId: newWork[0].id });
    });

  return validatedFields.data;
};

export const getUserCollection = async (slug: string) => {
  const user = await getUserData();

  const rows =
    user &&
    user.id !== null &&
    (await db
      .select()
      .from(collection)
      .where(and(eq(collection.userId, user.id), eq(collection.slug, 'work')))
      .leftJoin(work, eq(collection.id, work.collectionId))
      .leftJoin(media, eq(work.id, media.workId)));

  const result =
    rows &&
    rows.reduce<ICollection>((acc, row) => {
      const collection = row.collection_table;
      const work = row.work_table;
      const media = row.media_table;

      if (!acc.id && collection.id) {
        acc = { ...collection, works: [] };
      }
      if (work) {
        acc.works.push({ ...work, media: [] });
      }
      if (media) {
        acc.works[acc.works.length - 1].media.push({
          ...media,
          main: media.main ? 'true' : 'false',
        });
      }

      return acc;
    }, {} as ICollection);

  return result;
};

export const getPagesData = async (userId: number) => {
  return await db.select().from(pages).where(eq(pages.userId, userId));
};
