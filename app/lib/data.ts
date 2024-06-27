import { currentUser } from '@clerk/nextjs/server';
import { eq, and } from 'drizzle-orm';

import { db } from '../db';

import {
  users,
  pages,
  section,
  sectionAttribute,
  InsertUser,
  InsertSectionAttribute,
  NewUser,
  InsertPage,
  InsertSection,
} from '../db/schema';

export const user = async () => {
  return await currentUser();
};

export const getUserData = async (authId: string) => {
  return await db.select().from(users).where(eq(users.authId, authId));
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
    flagged: false,
    student: false,
  };

  let res = await db.insert(users).values(newUser).returning({ id: users.id });

  userId = res[0].id;

  let defaultPages = [
    { template: 'a1', title: 'About', userId: userId },
    { template: 'c1', title: 'Contact', userId: userId },
    { template: 'h1', title: 'Home', userId: userId },
    { template: 'g1', title: 'Selected Work', userId: userId },
    { template: 'r1', title: 'CV', userId: userId },
  ];

  const insertPages = async (defaultPages: InsertPage[]) => {
    await db.insert(pages).values(defaultPages);
  };

  await insertPages(defaultPages);
};

export const getPageData = async (title: string, userId: number) => {
  return await db
    .select()
    .from(pages)
    .where(and(eq(pages.title, title), eq(pages.userId, userId)))
    .leftJoin(section, eq(pages.id, section.pageId));
};

export const getPagesData = async (userId: number) => {
  return await db.select().from(pages).where(eq(pages.userId, userId));
};

export const insertSections = async (newData: InsertSection[]) => {
  await db.insert(section).values(newData);
};

export const insertSectionAttributes = async (
  newData: InsertSectionAttribute[],
) => {
  await db.insert(sectionAttribute).values(newData);
};
