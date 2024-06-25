import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users_table', {
  id: serial('id').primaryKey(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  plan: text('plan').notNull(),
  occupation: text('occupation').notNull(),
});

export const pagesTable = pgTable('pages_table', {
  id: serial('id').primaryKey(),
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

export const sectionTable = pgTable('section_table', {  
  id: serial('id').primaryKey(),
  pageId: integer('page_id').notNull().references(() => pagesTable.id, { onDelete: 'cascade' }),
  type: text('type'),
  order: integer('order'),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const sectionAttribute = pgTable('user_content_table', {
  id: serial('id').primaryKey(),
  tag: text('tag'),
  value: text('value'),
  sectionId: integer('section_id').notNull().references(() => sectionTable.id, { onDelete: 'cascade' }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const worksTable = pgTable('works_table', {
  id: serial('id').primaryKey(),
  title: text('title'),
  medium: text('medium'),
  description: text('description'),
  year: text('year'),
  height: text('height'),
  width:  text('width'),
  depth: text('depth'),
  unit: text('unit'),
  price: text('price'),
  currency: text('currency'),
  sold: text('sold'),
  edition: text('edition'),
  location: text('location'),
  img: integer('media_table_id').references(() => mediaTable.id, { onDelete: 'cascade' }),
  displayHeight: text('displayHeight').notNull(),
  displayWidth: text('displayWidth').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const mediaTable = pgTable('media_table', {
  id: serial('id').primaryKey(),
  title: text('title'),
  url: text('url'),
  type: text('type'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type GetUsers = typeof users.$inferSelect;

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertPost = typeof worksTable.$inferInsert;
export type SelectPost = typeof worksTable.$inferSelect;
