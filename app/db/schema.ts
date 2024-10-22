import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { title } from 'process';
import { user } from '../lib/data';
import { link } from 'fs';

export const users = pgTable('users_table', {
  id: serial('id').primaryKey(),
  authId: text('authId').notNull(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  displayName: text('displayName').notNull(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  plan: text('plan').notNull(),
  occupation: text('occupation'),
  domain: text('domain'),
  url: text('url'),
  customerId: text('customerId'),
  subscriptionId: text('subscriptionId'),
  hibernate: boolean('hibernate').default(false).notNull(),
  instagram: text('instagram'),
  sideNav: boolean('sideNav').default(false).notNull(),
  template: integer('template').default(1).notNull(),
});

export const pages = pgTable('pages_table', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull(),
  template: text('template').notNull(),
  title: text('title').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const about = pgTable('about_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  visibility: boolean('visibility').default(false).notNull(),
  slug: text('slug').notNull(),
  template: text('template').notNull(),
  heading: text('heading'),
  subheading: text('subheading'),
  text: text('text'),
  linkSrc1: text('linkSrc1'),
  linkText1: text('linkText1'),
  linkSrc2: text('linkSrc2'),
  linkText2: text('linkText2'),
  linkSrc3: text('linkSrc3'),
  linkText3: text('linkText3'),
  imgSrc: text('imgSrc'),
  imgCaption: text('imgCaption'),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const contact = pgTable('contact_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  visibility: boolean('visibility').default(false).notNull(),
  slug: text('slug').notNull(),
  template: text('template').notNull(),
  heading: text('heading'),
  subheading: text('subheading'),
  text: text('text'),
  linkSrc1: text('linkSrc1'),
  linkText1: text('linkText1'),
  linkSrc2: text('linkSrc2'),
  linkText2: text('linkText2'),
  instagram: text('instagram'),
  tiktok: text('tiktok'),
  facebook: text('facebook'),
  twitter: text('twitter'),
  linkedin: text('linkedin'),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  imgSrc: text('imgSrc'),
  imgCaption: text('imgCaption'),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const cv = pgTable('cv_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  visibility: boolean('visibility').default(false).notNull(),
  template: text('template').notNull(),
  heading: text('heading'),
  subheading: text('subheading'),
  imgSrc: text('imgSrc'),
  imgCaption: text('imgCaption'),
  pdf: text('pdf'),
  pdfName: text('pdfName'),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const cvSection = pgTable('cv_section_table', {
  id: serial('id').primaryKey(),
  categoryId: text('categoryId').notNull(),
  category: text('category').notNull(),
  title: text('title'),
  organization: text('organization'),
  location: text('location'),
  startDate: text('startDate'),
  endDate: text('endDate'),
  bulletPoint1: text('bulletPoint1'),
  bulletPoint2: text('bulletPoint2'),
  bulletPoint3: text('bulletPoint3'),
  order: integer('order'),
  cvId: integer('cv_id')
    .notNull()
    .references(() => cv.id, { onDelete: 'cascade' }),
});

export const collection = pgTable('collection_table', {
  id: serial('id').primaryKey(),
  index: integer('index'),
  idx: serial('idx'),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  template: text('template').notNull(),
  heading: text('heading'),
  subheading: text('subheading'),
  description: text('description'),
  linkSrc1: text('linkSrc1'),
  linkText1: text('linkText1'),
  linkSrc2: text('linkSrc2'),
  linkText2: text('linkText2'),
  imgSrc: text('imgSrc'),
  imgCaption: text('imgCaption'),
  visibility: text('visibility').default('private'),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const work = pgTable('work_table', {
  id: serial('id').primaryKey(),
  index: integer('index'),
  idx: serial('idx'),
  title: text('title'),
  medium: text('medium'),
  description: text('description'),
  year: text('year'),
  height: text('height'),
  width: text('width'),
  depth: text('depth'),
  unit: text('unit'),
  price: text('price'),
  currency: text('currency'),
  sold: boolean('sold').default(false),
  location: text('location'),
  displayHeight: text('displayHeight'),
  displayWidth: text('displayWidth'),
  hidden: text('hidden').default('false'),
  collectionId: integer('collection_id')
    .notNull()
    .references(() => collection.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const landing = pgTable('landing_table', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  visibility: boolean('visibility').default(false).notNull(),
  heading: text('heading'),
  subHeading: text('subHeading'),
  imgSrc: text('imgSrc'),
  template: integer('template').default(1).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const news = pgTable('news_table', {
  id: serial('id').primaryKey(),
  userId: integer('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  slug: text('slug').default('news').notNull(),
  visibility: boolean('visibility').default(false).notNull(),
  heading: text('heading'),
  subHeading: text('subHeading'),
  body: text('body'),
  imgSrc: text('imgSrc'),
  template: text('template').default('n1').notNull(),
});

export const newsPost = pgTable('news_post_table', {
  id: serial('id').primaryKey(),
  userId: integer('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  visibility: boolean('visibility').default(false).notNull(),
  newsId: integer('newsId')
    .notNull()
    .references(() => news.id, { onDelete: 'cascade' }),
  heading: text('heading'),
  subHeading: text('subHeading'),
  imgSrc: text('imgSrc'),
  body: text('body'),
  date: text('date'),
  location: text('location'),
  linkSrc1: text('linkSrc1'),
  linkText1: text('linkText1'),
  inquire: boolean('inquire').default(false).notNull(),
});

export const media = pgTable('media_table', {
  id: serial('id').primaryKey(),
  idx: serial('idx'),
  workId: integer('work_id')
    .notNull()
    .references(() => work.id, { onDelete: 'cascade' }),
  main: text('main').default('false'),
  type: text('type'),
  url: text('url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type NewUser = typeof users.$inferInsert;

export type GetUsers = typeof users.$inferSelect;

export type InsertPage = typeof pages.$inferInsert;
export type InsertWork = typeof work.$inferInsert;

export type InsertUser = typeof users.$inferInsert;
export type GetUser = typeof users.$inferSelect;

export type GetPage = typeof pages.$inferSelect;
