'use server';

import { currentUser, auth } from '@clerk/nextjs/server';
import { eq, and, inArray, or } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';
const stripe =
  process.env.STRIPE_SECRET_KEY && new Stripe(process.env.STRIPE_SECRET_KEY);

import {
  users,
  pages,
  about,
  contact,
  cv,
  cvSection,
  work,
  NewUser,
  InsertPage,
  InsertWork,
  media,
  collection,
} from '../db/schema';
import { IUser } from '../interfaces/IUser';
import { IAboutPage } from '../interfaces/IAboutPage';
import { ICVPage } from '../interfaces/ICVPage';
import { revalidatePath } from 'next/cache';
import { ICollection } from '../interfaces/ICollection';
import { IWork } from '../interfaces/IWork';
import { get } from 'http';
import { IContactPage } from '../interfaces/IContactPage';
import { getCVPageDataForSite } from './requests';
import { title } from 'process';

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
  } else {
    return null;
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
  const userData = await user();
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

  revalidatePath('/about');
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
  const userData = await user();

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

  userData !== null &&
    (await db
      .update(users)
      .set({
        instagram: instagram,
      })
      .where(eq(users.id, userData?.id)));

  revalidatePath('/contact');
  revalidatePath(`/contact`);
  return { success: true };
}

export const getUserData = async () => {
  const auth = await currentUser();
  console.log('auth', auth);
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
        acc = { ...user, pages: [], collections: [] };
      }
      if (page) {
        if (!acc.pages) {
          acc.pages = [];
        }
        acc.pages.push(page);
      }
      return acc;
    }, {} as IUser);
    return result;
  }

  return null;
};

export type UserState = {
  errors?: {
    username?: string[];
    displayName?: string[];
    occupation?: string[];
  };
  message?: string | null;
};

const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  displayName: z.string(),
  occupation: z.string(),
});

const UpdateUser = UserSchema.omit({
  id: true,
});

export const updateUser = async (
  id: number,
  prevState: {},
  formData: FormData,
) => {
  const validatedFields = UpdateUser.safeParse({
    displayName: formData.get('displayName') || '',
    username: formData.get('username') || '',
    occupation: formData.get('occupation') || '',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { username, displayName, occupation } = validatedFields.data;

  const update = await db
    .update(users)
    .set({
      username: username,
      displayName: displayName,
      occupation: occupation,
    })
    .where(eq(users.id, id))
    .returning({ id: users.id });

  revalidatePath('/account');
  revalidatePath(`/${username}`);

  return { success: true };
};

//
const UserCustomDomainSchema = z.object({
  id: z.number(),
  domain: z.string().nullish(),
});

const UpdateUserCustomDomain = UserCustomDomainSchema.omit({
  id: true,
});

export const updateUserCustomDomain = async (
  id: number,
  prevState: {},
  formData: FormData,
) => {
  const userData = await user();

  const validatedFields = UpdateUserCustomDomain.safeParse({
    domain: formData.get('domain') || '',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { domain } = validatedFields.data;

  // paywall
  if (userData && userData.plan === 'free') {
    return { success: false };
  }

  // api call to vercel to add a new domain:
  const vercelFormData = new FormData();
  domain && vercelFormData.append('name', domain);
  vercelFormData.append('cdnEnabled', 'true');
  vercelFormData.append('zone', 'true');
  vercelFormData.append('method', 'add');

  const vercelResponse =
    domain &&
    (await fetch('https://api.vercel.com/v5/projects/dash/domains', {
      body: JSON.stringify({
        name: domain,
        cdnEnabled: true,
        zone: true,
        method: 'add',
      }),
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      method: 'post',
    }));
  const update = await db
    .update(users)
    .set({
      domain: domain,
    })
    .where(eq(users.id, id))
    .returning({ id: users.id });

  revalidatePath('/account');
  return { success: true, message: '76.76.21.21' };
};
//

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
    displayName: firstName + ' ' + lastName,
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

export const getAboutPageData = async (username: string, title: string) => {
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
      .where(eq(cv.userId, userData?.id))
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
    const orderedEducation = result?.education.sort(compareFn);
    const orderedGroupExhibitions = result?.groupExhibitions.sort(compareFn);
    const orderedSoloExhibitions = result?.soloExhibitions.sort(compareFn);
    const orderedAwards = result?.awards.sort(compareFn);
    const orderedResidencies = result?.residencies.sort(compareFn);
    const orderedPress = result?.press.sort(compareFn);
    const orderedTeaching = result?.teaching.sort(compareFn);

    result.groupExhibitions = orderedGroupExhibitions;
    result.soloExhibitions = orderedSoloExhibitions;
    result.awards = orderedAwards;
    result.residencies = orderedResidencies;
    result.press = orderedPress;
    result.teaching = orderedTeaching;
    result.education = orderedEducation;
    return result;
  }
};

export const createCollection = async () => {
  const userData = await user();

  const userCollections =
    userData &&
    (await db
      .select()
      .from(collection)
      .where(eq(collection.userId, userData?.id)));

  let userCollection =
    userCollections &&
    (await db
      .insert(collection)
      .values({
        template: 'g1',
        slug: 'new-collection' + '-' + String(userCollections.length + 1),
        title: 'New Collection' + ' ' + String(userCollections.length + 1),
        userId: userData?.id,
      })
      .returning({
        id: collection.id,
        title: collection.title,
        slug: collection.slug,
        visibility: collection.visibility,
        idx: collection.idx,
      }));
  revalidatePath('/collections');

  if (userCollection) {
    return userCollection[0] as ICollection;
  }
};

export const deleteCVSection = async (id: number) => {
  const userData = await user();

  await db.delete(cvSection).where(eq(cvSection.id, id));
  revalidatePath('/cv');
  const res = await getCVPageData('CV');
  return res;
};

export const deleteCollection = async (id: number) => {
  await db.delete(collection).where(eq(collection.id, id));
};

export const deleteCVSectionBulletPoint = async (
  id: number,
  bulletPointIndex: number,
) => {
  const userData = await user();
  const bulletPointKey = `bulletPoint${bulletPointIndex + 1}`;

  revalidatePath('/cv');

  return await db
    .update(cvSection)
    .set({ [bulletPointKey]: null })
    .where(eq(cvSection.id, id));
};

export const addCVPDF = async (url: string) => {
  const userData = await user();
  const newCVPDF =
    userData &&
    (await db
      .update(cv)
      .set({
        pdf: url,
        pdfName: 'cv.pdf',
      })
      .where(eq(cv.userId, userData?.id)));

  revalidatePath('/cv');
};

export const removeCVPDF = async () => {
  const userData = await user();
  const newCVPDF =
    userData &&
    (await db
      .update(cv)
      .set({
        pdf: null,
        pdfName: null,
      })
      .where(eq(cv.userId, userData?.id)));

  revalidatePath('/cv');
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

  revalidatePath('/cv');
  revalidatePath(`/cv`);
  const res = await getCVPageData('cv');
  return res;
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
});
// convert to server action with object not formData?
export const createWork = async (data: IWork, slug: string) => {
  const user = await getUserData();
  // const validatedFields = CreateWorkSchema.safeParse({
  //   userCollection: formData.get('userCollection'),
  //   title: formData.get('title') || '',
  //   medium: formData.get('medium') || '',
  //   year: formData.get('year') || '',
  //   description: formData.get('description') || '',
  //   height: formData.get('height') || '',
  //   width: formData.get('width') || '',
  //   depth: formData.get('depth') || '',
  //   unit: formData.get('unit') || '',
  //   price: formData.get('price') || '',
  //   currency: formData.get('currency') || '',
  //   location: formData.get('location') || '',
  //   sold: formData.get('sold') === 'on' ? 'true' : 'false',
  // });
  // if (!validatedFields.success) {
  //   console.log('error!', validatedFields.error.flatten().fieldErrors);
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //     message: 'Missing Fields. Failed to Create Work.',
  //   };
  // }
  const {
    // userCollection,
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
  } = data;

  console.log('work', work);
  const userCollectionData =
    user &&
    user.id !== null &&
    (await db
      .select()
      .from(collection)
      .where(and(eq(collection.slug, slug), eq(collection.userId, user.id))));
  const newWork =
    user &&
    user.id !== null &&
    userCollectionData &&
    userCollectionData[0].id !== null &&
    (await db
      .insert(work)
      .values({
        collectionId: userCollectionData[0].id,
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
        sold: sold ? 'true' : 'false',
        hidden: 'false',
      })
      .returning({ id: work.id }));

  newWork &&
    newWork[0].id &&
    data.media.map(async (m) => {
      await db.insert(media).values({
        workId: newWork[0].id,
        url: m.url || '',
        main: m.main || 'false',
        type: m.type || 'image',
      });
    });
  revalidatePath(`/collections/${collection.slug}`);
  revalidatePath(`/${collection.slug}`);
  revalidatePath('/');
  // redirect(`/collections/${userCollectionData[0].slug}`);
};

export const updateWork = async (data: IWork, collectionSlug: string) => {
  const user = await getUserData();

  const {
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
  } = data;
  const updatedWork =
    user &&
    user.id !== null &&
    (await db
      .update(work)
      .set({
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
        sold: sold ? 'true' : 'false',
        hidden: 'false',
      })
      .where(eq(work.id, data.id as number)));

  revalidatePath(`/collections/${collectionSlug}`);
  revalidatePath(`/${collectionSlug}`);
  revalidatePath('/');
  // redirect(`/collections/${userCollectionData[0].slug}`);
};

export const createWorkWithMedia = async (
  newMedia: { url: string; main: string; type: string },
  slug: string,
) => {
  const user = await getUserData();
  const userCollectionData =
    user &&
    user.id !== null &&
    (await db
      .select()
      .from(collection)
      .where(and(eq(collection.slug, slug), eq(collection.userId, user.id))));

  const userCollectionDataWithWork =
    user &&
    user.id !== null &&
    (await db
      .select()
      .from(collection)
      .where(and(eq(collection.slug, slug), eq(collection.userId, user.id)))
      .leftJoin(work, eq(collection.id, work.collectionId)));

  const newWorkIndex =
    userCollectionDataWithWork &&
    userCollectionDataWithWork.reduce((acc, cur) => {
      if (cur.work_table) {
        acc += 1;
      }
      return acc;
    }, 1);

  const newWorkEntry =
    userCollectionData &&
    userCollectionData[0].id !== null &&
    user.id !== null &&
    newWorkIndex &&
    (await db
      .insert(work)
      .values({
        collectionId: userCollectionData[0].id,
        idx: newWorkIndex,
      })
      .returning({
        id: work.id,
        idx: work.idx,
        collectionId: work.collectionId,
        hidden: work.hidden,
        title: work.title,
        medium: work.medium,
        year: work.year,
        description: work.description,
        height: work.height,
        width: work.width,
        depth: work.depth,
        unit: work.unit,
        price: work.price,
        currency: work.currency,
        location: work.location,
        sold: work.sold,
        createdAt: work.createdAt,
        updatedAt: work.updatedAt,
        index: work.index,
        displayHeight: work.displayHeight,
        displayWidth: work.displayWidth,
      }));

  const newMediaEntry =
    newWorkEntry &&
    newWorkEntry[0].id !== null &&
    (await db
      .insert(media)
      .values({
        workId: newWorkEntry[0].id,
        url: newMedia.url,
        main: newMedia.main,
        type: newMedia.type,
      })
      .returning({
        idx: media.idx,
        id: media.id,
        workId: media.workId,
        url: media.url,
        main: media.main,
        type: media.type,
      }));

  const newWork = newWorkEntry &&
    newMediaEntry && { ...newWorkEntry[0], media: newMediaEntry };

  return newWork;
};

export const addMedia = async (
  id: number,
  newMedia: { url: string; type: string; main: string },
  slug: string,
) => {
  const newMediaEntry = await db
    .insert(media)
    .values({
      workId: id,
      url: newMedia.url,
      main: newMedia.main,
      type: newMedia.type,
    })
    .returning({ id: media.id });
  revalidatePath(`/collections/${slug}/piece/${id}`);
  revalidatePath(`/collections/${slug}/new`);
  revalidatePath(`/${slug}`);
  revalidatePath('/');
  return newMediaEntry[0];
};

export const deleteWork = async (workId: number, collectionSlug: string) => {
  await db.delete(work).where(eq(work.id, workId));

  revalidatePath(`/collections/${collectionSlug}`);
  revalidatePath(`/${collectionSlug}`);
  revalidatePath(`/`);

  // redirect(`/collections/${collectionSlug}`);
};

export const deleteMedia = async (mediaId: number, slug: string) => {
  await db.delete(media).where(eq(media.id, mediaId));

  revalidatePath(`/collections/${slug}`);
};

export const makeMainMedia = async (
  workId: number,
  mediaId: number,
  slug: string,
) => {
  // need drag and drop reorder for thumbnails
  // need idx property on media, fetch them in order
  await db.update(media).set({ main: 'false' }).where(eq(media.workId, workId));
  await db.update(media).set({ main: 'true' }).where(eq(media.id, mediaId));
  revalidatePath(`/collections/${slug}/piece/${workId}`);
  revalidatePath(`/collections/${slug}/new`);
  revalidatePath(`/collections/${slug}`);
  revalidatePath(`/${slug}`);
  revalidatePath('/');
};

export const getUserCollection = async (slug: string) => {
  const user = await getUserData();

  const rows =
    user &&
    user.id !== null &&
    (await db
      .select()
      .from(collection)
      .where(and(eq(collection.userId, user.id), eq(collection.slug, slug)))
      .leftJoin(work, eq(collection.id, work.collectionId))
      .leftJoin(media, eq(work.id, media.workId)));

  let result =
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
        !isNew &&
          acc.works.push({
            ...work,
            media: [],
          });
      }
      if (media) {
        acc.works.find((w) => w.id === media.workId)?.media.push(media);
      }

      return acc;
    }, {} as ICollection);

  if (result) {
    revalidatePath(`/${result.slug}`);
    revalidatePath(`/${result.slug}`);
    const sorted = result.works
      ? result.works.sort((a, b) => a.idx - b.idx)
      : result.works;

    return { ...result, works: sorted };
  } else {
    return {
      id: 0,
      title: '',
      index: 0,
      idx: 0,
      slug: '',
      description: '',
      linkSrc1: '',
      linkText1: '',
      linkSrc2: '',
      linkText2: '',
      template: '',
      heading: '',
      subheading: '',
      imgSrc: '',
      imgCaption: '',
      visibility: '',
      userId: 0,
      works: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
};

export const getUserCollections = async () => {
  const user = await getUserData();
  const rows =
    user &&
    user.id !== null &&
    (await db
      .select()
      .from(collection)
      .where(eq(collection.userId, user.id))
      .leftJoin(work, eq(work.collectionId, collection.id))
      .leftJoin(media, eq(media.workId, work.id)));

  const result =
    rows &&
    rows.reduce<ICollection[]>((acc, row) => {
      const collection = row.collection_table;
      const work = row.work_table;
      const media = row.media_table;

      if (collection) {
        // Find or create the collection
        let collectionEntry = acc.find((col) => col.id === collection.id);
        if (!collectionEntry) {
          collectionEntry = { ...collection, works: [] };
          acc.push(collectionEntry);
        }

        if (work) {
          // Ensure the work is added to the correct collection
          let workEntry = collectionEntry.works.find((w) => w.id === work.id);
          if (!workEntry) {
            workEntry = { ...work, media: [] };
            collectionEntry.works.push(workEntry);
          }

          if (media) {
            // Ensure the media is added to the correct work in the correct collection
            const workToUpdate = collectionEntry.works.find(
              (w) => w.id === media.workId,
            );
            if (workToUpdate) {
              workToUpdate.media.push(media);
            }
          }
        }
      }

      return acc;
    }, [] as ICollection[]);

  if (result) {
    const sorted = result.sort((a, b) => a.idx - b.idx);
    return sorted;
  }
};

export type CollectionState = {
  errors?: {
    template?: string[];
    title?: string[];
    heading?: string[];
    subheading?: string[];
    description?: string[];
    linkText1?: string[];
    linkSrc1?: string[];
    linkText2?: string[];
    linkSrc2?: string[];
    imgSrc?: string[];
  };
  message?: string | null;
};

const CollectionFormSchema = z.object({
  id: z.number(),
  template: z.string(),
  title: z
    .string()
    .max(100, { message: 'Must be fewer than 100 characters.' })
    .nullish(),
  subheading: z
    .string()
    .max(100, { message: 'Must be fewer than 100 characters.' })
    .nullish(),
  description: z
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
  slug: z.string().max(100, { message: 'Must be fewer than 30 characters.' }),
  linkSrc2: z
    .string({ invalid_type_error: 'Please use a valid url.' })
    .url()
    .nullish(),
  visibility: z.string(),
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

const UpdateCollection = CollectionFormSchema.omit({
  id: true,
});

export const reorderWorks = async (updatedWorks: IWork[]) => {
  // need collection slug for revalidate path
  // const userData = await user();
  if (updatedWorks.length === 0) return;
  if (!Number(updatedWorks[0].id)) return;
  for (let i = 0; i < updatedWorks.length; i++) {
    const query = await db
      .update(work)
      .set({ idx: i + 1 })
      .where(eq(work.id, Number(updatedWorks[i].id)))
      .returning({ id: work.id });
  }
  // revalidatePath(`/collections/${userData?.username}`);
};

export const reorderCollections = async (updatedCollections: ICollection[]) => {
  // need collection slug for revalidate path
  // const userData = await user();
  for (let i = 0; i < updatedCollections.length; i++) {
    const query = await db
      .update(collection)
      .set({ idx: i + 1 })
      .where(eq(collection.id, Number(updatedCollections[i].id)))
      .returning({ id: collection.id });
  }
  // revalidatePath(`/collections/${userData?.username}`);
};

export const updateCollection = async (
  id: number,
  prevState: {},
  formData: FormData,
) => {
  const user = await getUserData();

  const validatedFields = UpdateCollection.safeParse({
    template: formData.get('template') || '',
    title: formData.get('title') || '',
    subheading: formData.get('subheading') || null,
    description: formData.get('description') || null,
    linkSrc1: formData.get('linkSrc1') || null,
    linkText1: formData.get('linkText1') || '',
    linkSrc2: formData.get('linkSrc2') || null,
    linkText2: formData.get('linkText2') || '',
    imgSrc: formData.get('imgSrc') || null,
    visibility: formData.get('visibility') || 'private',
    slug: formData.get('slug'),
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
    description,
    title,
    subheading,
    linkSrc1,
    linkText1,
    linkSrc2,
    slug,
    linkText2,
    imgSrc,
    imgCaption,
  } = validatedFields.data;

  const update = await db
    .update(collection)
    .set({
      template: template,
      description: description,
      title: title || '',
      subheading: subheading,
      // visibility: visibility, done in separate function
      linkSrc1: linkSrc1,
      slug: slug,
      linkText1: linkText1,
      linkSrc2: linkSrc2,
      linkText2: linkText2,
      imgSrc: imgSrc,
      imgCaption: imgCaption,
    })
    .where(eq(collection.id, id))
    .returning({ id: collection.id });

  revalidatePath(`/collections/${slug}`);
  revalidatePath(`/${slug}`);
  revalidatePath(`/`);

  return { success: true };
};

export const updateCollectionVisibility = async (
  collectionId: number,
  visibility: string,
) => {
  const userCollection = await db
    .select()
    .from(collection)
    .where(eq(collection.id, collectionId));

  const collectionData = userCollection[0];

  await db
    .update(collection)
    .set({ visibility: visibility })
    .where(eq(collection.id, collectionId));

  collectionData && revalidatePath(`/collections/${collectionData.slug}`);
};

export const getUserWork = async (id: number) => {
  const user = await getUserData();
  const rows =
    user &&
    user.id !== null &&
    (await db
      .select()
      .from(work)
      .where(eq(work.id, id))
      .leftJoin(media, eq(work.id, media.workId)));

  const result =
    rows &&
    rows.reduce<IWork>((acc, row) => {
      const work = row.work_table;
      const media = row.media_table;

      if (!acc.id && work.id) {
        acc = { ...work, media: [] };
      }
      if (media) {
        acc.media.push(media);
      }
      return acc;
    }, {} as IWork);

  return result;
};

export const getPagesData = async (userId: number) => {
  return await db.select().from(pages).where(eq(pages.userId, userId));
};
