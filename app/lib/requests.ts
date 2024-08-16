import { eq, and, or } from 'drizzle-orm';
import { db } from '../db';

import {
  users,
  about,
  contact,
  cv,
  cvSection,
  work,
  collection,
  media,
} from '../db/schema';

import { IUser } from '../interfaces/IUser';
import { IAboutPage } from '../interfaces/IAboutPage';
import { ICVPage } from '../interfaces/ICVPage';
import { revalidatePath } from 'next/cache';
import { ICollection } from '../interfaces/ICollection';
import { IContactPage } from '../interfaces/IContactPage';

// functions for generating site:
export const getUserByUsername = async (username: string) => {
  const subdomain = username.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? username.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
    : null;
  console.log(subdomain, username);
  const key = subdomain ? 'username' : 'domain';
  const value = subdomain || username;

  let rows = await db
    .select()
    .from(users)
    .where(eq(users[key], value))
    .leftJoin(collection, eq(collection.userId, users.id));

  const result = rows.reduce<IUser>((acc, row) => {
    const user = row.users_table;
    const collection = row.collection_table;

    if (!acc.id && user.id) {
      acc = { ...user, pages: [], collections: [] };
    }
    if (collection) {
      if (!acc.collections) {
        acc.collections = [];
      }
      collection.visibility === 'public' &&
        acc.collections.push({ ...collection, works: [] });
    }
    return acc;
  }, {} as IUser);

  if (result) {
    console.log('user:', result);
    return result;
  } else {
    return null;
  }
};

export const getAboutPageDataForSite = async (
  username: string,
  title: string,
): Promise<{
  status: number;
  user: { username: string } | null;
  data: IAboutPage | null;
}> => {
  const userData = await getUserByUsername(username);
  if (!userData || userData.firstName === null || userData.lastName === null) {
    return { status: 200, user: null, data: null };
  }

  const rows =
    userData &&
    userData.id !== null &&
    (await db.select().from(about).where(eq(about.userId, userData?.id)));
  const responseData = rows && (rows[0] as IAboutPage);
  if (responseData) {
    return {
      status: 200,
      user: { username: userData.username },
      data: responseData,
    };
  } else {
    return {
      status: 404,
      user: { username: userData.username },
      data: null,
    };
  }
};

export const getContactPageDataForSite = async (
  username: string,
  title: string,
): Promise<{
  status: number;
  user: { username: string } | null;
  data: IContactPage | null;
}> => {
  const userData = await getUserByUsername(username);

  if (!userData || userData.firstName === null || userData.lastName === null) {
    return { status: 200, user: null, data: null };
  }

  const rows =
    userData &&
    userData.id !== null &&
    (await db.select().from(contact).where(eq(contact.userId, userData?.id)));

  const responseData = rows && (rows[0] as IContactPage);
  if (responseData) {
    return {
      status: 200,
      user: {
        username: userData.username,
      },
      data: responseData,
    };
  } else {
    return {
      status: 404,
      user: {
        username: userData.username,
      },
      data: null,
    };
  }
};

export const getCVPageDataForSite = async (
  username: string,
  title: string,
): Promise<{
  status: number;
  user: { username: string } | null;
  data: ICVPage | null;
}> => {
  const userData = await getUserByUsername(username);

  if (!userData || userData.firstName === null || userData.lastName === null) {
    return { status: 200, user: null, data: null };
  }

  const rows =
    userData &&
    userData.id !== null &&
    (await db
      .select()
      .from(cv)
      .where(eq(cv.userId, userData?.id))
      .leftJoin(cvSection, eq(cvSection.cvId, cv.id)));

  // Need to reduce the rows into the correct format, as the join returns multiple rows, then map over the categories on the front end
  /*
  {status: 200, user: {}, data:{
    education: [{}, {}],
    soloExhibitions: [{}, {}],
    groupExhibitions: [{}, {}],
    awards: [{}, {}],
    press: [{}, {}],
    residencies: [{}, {}],
    teaching: [{}, {}],

  }}
  */
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
        let sectionData = { ...section, bulletPoints: [] };
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

  if (result) {
    return {
      status: 200,
      user: { username: userData.username },
      data: result,
    };
  } else {
    return {
      status: 404,
      user: { username: userData.username },
      data: null,
    };
  }
};

export const getCollectionDataForSite = async (
  username: string,
  slug: string | null,
) => {
  if (username === 'selected-work.com') {
    return { status: 404, user: null, data: null };
  }
  const user = await getUserByUsername(username);

  if (!user) {
    return { status: 404, user: null, data: null };
  }
  let rows;

  if (!slug) {
    const collectionData = await db
      .select()
      .from(collection)
      .where(eq(collection.userId, user.id));

    rows =
      user.id !== null &&
      collectionData[0].id !== null &&
      (await db
        .select()
        .from(collection)
        .where(eq(collection.id, collectionData[0].id))
        .leftJoin(work, eq(collection.id, work.collectionId))
        .leftJoin(media, eq(work.id, media.workId)));
  } else {
    rows =
      user.id !== null &&
      (await db
        .select()
        .from(collection)
        .where(and(eq(collection.userId, user.id), eq(collection.slug, slug)))
        .leftJoin(work, eq(collection.id, work.collectionId))
        .leftJoin(media, eq(work.id, media.workId)));
  }

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
        const isNew = acc.works.find((w) => w.id === work.id);
        !isNew && acc.works.push({ ...work, media: [] });
      }
      if (media) {
        acc.works.find((w) => w.id === media.workId)?.media.push(media);
      }
      const sortedWorks = acc.works.sort((a, b) => a.idx - b.idx);
      return { ...acc, works: sortedWorks };
    }, {} as ICollection);

  if (result && user) {
    return {
      status: 200,
      user: {
        username: user.firstName + ' ' + user.lastName,
        displayName: user.displayName,
      },
      data: result,
    };
  } else {
    return {
      status: 200,
      user: null,
      data: null,
    };
  }
};
