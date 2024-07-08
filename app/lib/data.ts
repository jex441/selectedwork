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

    interface Data {
      users_table: IUser | null;
      pages_table: IPage | null;
    }

    function transformData(data: Data[]) {
      const userObj: IUser | null = data[0].users_table && {
        id: data[0].users_table.id,
        authId: data[0].users_table.authId,
        firstName: data[0].users_table.firstName,
        lastName: data[0].users_table.lastName,
        username: data[0].users_table.username,
        email: data[0].users_table.email,
        plan: data[0].users_table.plan,
        occupation: data[0].users_table.occupation,
        domain: data[0].users_table.domain,
        url: data[0].users_table.url,
        pages: [],
      };

      const pagesMap = new Map();

      interface Record {
        users_table: IUser | null;
        pages_table: IPage | null;
        sections_table: ISection | null;
        section_attributes_table: ISectionAttribute | null;
      }

      data.forEach((record: Record) => {
        const page = record.pages_table;

        if (page !== null) {
          if (!pagesMap.has(page.id)) {
            pagesMap.set(page.id, {
              id: page.id,
              template: page.template,
              title: page.title,
              userId: page.userId,
            });
          }
        }
      });

      if (userObj !== null) {
        userObj.pages = Array.from(pagesMap.values());
      }

      return userObj;
    }

    const result = transformData(rows);
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
