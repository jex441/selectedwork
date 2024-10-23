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
  landing,
  workshops,
  workshop,
} from '../db/schema';

import { IUser } from '../interfaces/IUser';
import { IAboutPage } from '../interfaces/IAboutPage';
import { ICVPage } from '../interfaces/ICVPage';
import { revalidatePath } from 'next/cache';
import { ICollection } from '../interfaces/ICollection';
import { IContactPage } from '../interfaces/IContactPage';
import { ILandingPage } from '../interfaces/ILandingPage';
import { IWorkshopsPage } from '../interfaces/IWorkshopsPage';

// functions for generating site:
export const getUserByUsername = async (username: string) => {
  const subdomain = username.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? username.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
    : null;
  const key = subdomain ? 'username' : 'domain';
  const value = subdomain || username;

  let rows = await db
    .select()
    .from(users)
    .where(eq(users[key], value))
    .leftJoin(collection, eq(collection.userId, users.id))
    .leftJoin(landing, eq(landing.userId, users.id))
    .leftJoin(about, eq(about.userId, users.id))
    .leftJoin(contact, eq(contact.userId, users.id))
    .leftJoin(cv, eq(cv.userId, users.id))
    .leftJoin(workshops, eq(workshops.userId, users.id));

  let result = rows.reduce<IUser>((acc, row) => {
    const user = row.users_table;
    const collection = row.collection_table;
    const landing = row.landing_table;
    const about = row.about_table;
    const contact = row.contact_table;
    const cv = row.cv_table;
    const workshops = row.workshops_table;

    if (!acc.id && user.id) {
      acc = { ...user, collections: [], pages: [] };
    }

    if (collection) {
      if (!acc.collections) {
        acc.collections = [];
      }
      collection.visibility === 'public' &&
        acc.collections.push({ ...collection, works: [] });
    }

    if (!acc.pages) {
      acc.pages = [];
    }

    if (
      about &&
      about.visibility === true &&
      !acc.pages.find((p) => p.slug === 'about')
    ) {
      acc.pages.push({ title: 'About', slug: 'about' });
    }
    if (
      workshops &&
      workshops.visibility === true &&
      !acc.pages.find((p) => p.slug === 'classes')
    ) {
      acc.pages.push({ title: 'Classes', slug: 'classes' });
    }
    if (
      cv &&
      cv.visibility === true &&
      !acc.pages.find((p) => p.slug === 'cv')
    ) {
      acc.pages.push({ title: 'CV', slug: 'cv' });
    }
    if (
      contact &&
      contact.visibility === true &&
      !acc.pages.find((p) => p.slug === 'contact')
    ) {
      acc.pages.push({ title: 'Contact', slug: 'contact' });
    }
    return acc;
  }, {} as IUser);
  if (result) {
    const collections = result.collections;
    const sortedCollections =
      result.collections !== null &&
      result.collections.sort((a, b) => a.idx - b.idx);
    result.collections = sortedCollections || collections;
    return result;
  } else {
    return null;
  }
};

export const getLandingPageDataForSite = async (
  username: string,
): Promise<ILandingPage | undefined> => {
  const userData = await getUserByUsername(username);
  if (!userData) return;

  const data = await db
    .select()
    .from(landing)
    .where(eq(landing.userId, userData?.id));

  return data[0] as ILandingPage;
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
  let responseData = rows && (rows[0] as IAboutPage);

  if (responseData) {
    responseData.template = `a${String(userData.template)}`;

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

export const getWorkshopsPageDataForSite = async (
  username: string,
): Promise<{
  status: number;
  user: { username: string } | null;
  data: IWorkshopsPage | null;
}> => {
  const userData = await getUserByUsername(username);
  if (!userData || userData.firstName === null || userData.lastName === null) {
    return { status: 200, user: null, data: null };
  }
  if (!userData) return { status: 404, user: null, data: null };

  // (await db.select().from(contact).where(eq(contact.userId, userData?.id)));

  const rows = await db
    .select()
    .from(workshops)
    .where(eq(workshops.userId, userData?.id))
    .leftJoin(workshop, eq(workshop.workshopsId, workshops.id));
  const responseData =
    rows &&
    rows.reduce<IWorkshopsPage>((acc, row) => {
      const workshopsPage = row.workshops_table;
      const workshop = row.workshop_table;

      if (!acc.id && workshopsPage.id) {
        acc = {
          ...workshopsPage,
          workshops: [],
        };
      }
      if (workshop && workshop?.visibility === true) {
        acc.workshops = [...acc.workshops, workshop];
      }
      return acc;
    }, {} as IWorkshopsPage);

  if (responseData) {
    responseData.template = `w${String(userData.template)}`;

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

  let responseData = rows && (rows[0] as IContactPage);
  if (responseData) {
    responseData.template = `c${String(userData.template)}`;
    responseData.email = userData.email as string;
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
    type Line = {
      id: number;
      categoryId: string | null;
      category: string | null;
      title: string | null;
      organization: string | null;
      location: string | null;
      startDate: string | null;
      endDate: string | null;
      bulletPoint1: string | null;
      bulletPoint2: string | null;
      bulletPoint3: string | null;
      order: string | null;
      cvId: number;
      bulletPoints: string[];
    };
    const compareFn = (a: Line, b: Line) =>
      a.startDate !== null && b.startDate !== null && a.startDate > b.startDate
        ? -1
        : 0;
    const orderedEducation = result.education.sort(compareFn);
    const orderedGroupExhibitions = result.groupExhibitions.sort(compareFn);
    const orderedSoloExhibitions = result.soloExhibitions.sort(compareFn);
    const orderedAwards = result.awards.sort(compareFn);
    const orderedResidencies = result.residencies.sort(compareFn);
    const orderedPress = result.press.sort(compareFn);
    const orderedTeaching = result.teaching.sort(compareFn);

    result.groupExhibitions = orderedGroupExhibitions;
    result.soloExhibitions = orderedSoloExhibitions;
    result.awards = orderedAwards;
    result.residencies = orderedResidencies;
    result.press = orderedPress;
    result.teaching = orderedTeaching;
    result.education = orderedEducation;

    result.template = `r${String(userData.template)}`;

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
      .where(
        and(
          eq(collection.userId, user.id),
          // eq(collection.visibility, 'public'),
          eq(collection.idx, 1),
        ),
      );
    if (collectionData.length === 0)
      return { status: 404, user: null, data: null };
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
    result.template = `g${String(user.template)}`;
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
