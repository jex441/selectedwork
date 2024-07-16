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

export const getPagesData = async (userId: number) => {
  return await db.select().from(pages).where(eq(pages.userId, userId));
};

export const insertSections = async (newData: InsertSection[]) => {
  return await db.insert(section).values(newData).returning({ id: section.id });
};
