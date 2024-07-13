'use server';

import { currentUser, auth } from '@clerk/nextjs/server';
import { eq, and, inArray } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';

import {
  users,
  pages,
  about,
  section,
  sectionAttribute,
  InsertUser,
  InsertSectionAttribute,
  NewUser,
  InsertPage,
  InsertSection,
} from '../db/schema';
import { IPage } from '../interfaces/IPage';
import { IUser } from '../interfaces/IUser';
import { ISection } from '../interfaces/ISection';
import { ISectionAttribute } from '../interfaces/ISectionAttribute';
import { IAboutPage } from '../interfaces/IAboutPage';
import { link } from 'fs';

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
  linkSrc2: z.string().url().nullish(),
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
  const currentUser = (await auth()) || null;
  const data =
    currentUser !== null &&
    (await db.select().from(users).where(eq(users.authId, currentUser.userId)));
  return data[0];
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
    linkSrc2: formData.get('linkSrc2') || '',
    linkText2: formData.get('linkText2') || '',
    imgSrc: formData.get('imgSrc') || '',
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

export const getUserData = async () => {
  const auth = await currentUser();

  if (auth !== null) {
    const rows = await db
      .select()
      .from(users)
      .where(eq(users.authId, auth.id))
      .leftJoin(pages, eq(users.id, pages.userId));

    const result = rows.reduce((acc, row) => {
      const user = row.users_table;
      const page = row.pages_table;

      if (!acc.id) {
        acc = { ...user, pages: [] };
      }
      if (page) {
        acc.pages.push(page);
      }
      return acc;
    }, {});
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

  const rows = await db
    .select()
    .from(about)
    .where(and(eq(about.title, title), eq(about.userId, userData?.id)));

  return rows[0];
};

export const getPagesData = async (userId: number) => {
  return await db.select().from(pages).where(eq(pages.userId, userId));
};

export const insertSections = async (newData: InsertSection[]) => {
  return await db.insert(section).values(newData).returning({ id: section.id });
};

export const insertSectionAttributes = async (
  newData: InsertSectionAttribute[],
) => {
  return await db
    .insert(sectionAttribute)
    .values(newData)
    .returning({ id: sectionAttribute.id });
};
