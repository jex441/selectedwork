import { currentUser, auth } from '@clerk/nextjs/server';
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
import { IPage } from '../interfaces/IPage';
import { IUser } from '../interfaces/IUser';
import { ISection } from '../interfaces/ISection';
import { ISectionAttribute } from '../interfaces/ISectionAttribute';

export const user = async () => {
  const currentUser = (await auth()) || null;
  const data =
    currentUser !== null &&
    (await db.select().from(users).where(eq(users.authId, currentUser.userId)));
  return data[0];
};

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

export const getPageData = async (title: string) => {
  const userData = await user();
  const rows = await db
    .select()
    .from(pages)
    .where(and(eq(pages.title, title), eq(pages.userId, userData?.id)))
    .leftJoin(section, eq(pages.id, section.pageId))
    .leftJoin(sectionAttribute, eq(section.id, sectionAttribute.sectionId));

  const result = rows.reduce((acc, row) => {
    const page = row.pages_table;
    const section = row.sections_table;
    const sectionAttribute = row.section_attributes_table;

    if (!acc.id) {
      acc = { ...page, sections: [] };
    }
    if (section) {
      acc.sections.push(section);
    }
    if (sectionAttribute) {
      acc.sections.forEach((section) => {
        if (section.id === sectionAttribute.sectionId) {
          section.attributes = sectionAttribute;
        }
      });
    }
    return acc;
  }, {});

  return result;
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
