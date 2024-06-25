import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('name').notNull(),
  lastName: text('name').notNull(),
  username: text('name').notNull(),
  email: text('email').notNull().unique(),
  plan: text('plan').notNull(),
  occupation: text('occupation').notNull(),
});

export const pagesTable = pgTable('pages_table', {
  id: serial('id').primaryKey(),
  template: text('template').notNull(),
  title: text('title').notNull(),
  subheading: text('subheading').notNull(),
  body: text('title').notNull(),
  content: text('content').notNull(),
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
    mainImg: text('mainImg').notNull(),
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

export type GetUsers = typeof users.$inferSelect;

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertPost = typeof worksTable.$inferInsert;
export type SelectPost = typeof worksTable.$inferSelect;
