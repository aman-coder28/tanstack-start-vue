import { queryOptions } from "@tanstack/vue-query";
import { createServerFn } from "@tanstack/vue-start";
import { and, eq } from "drizzle-orm";
import slugify from "slug";
import * as v from "valibot";
import { db } from ".";
import { texts, todos } from "./schema";

export const getServerSessionFn = createServerFn({ method: "GET" }).handler(async ({ context }) => {
  return context.session;
});

export function ServerSessionQueryOptions() {
  return queryOptions({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getServerSessionFn();

      return user;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function GetTextsQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ["tasks", slug],
    queryFn: async () => {
      return await getTextsFn({ data: slug });
    },
    staleTime: 1000 * 60 * 5,
  });
}

const slug = v.string();

export function GetTextQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ["task", slug],
    queryFn: async () => {
      return await getTextFn({ data: slug });
    },
    staleTime: 1000 * 60 * 5,
  });
}

export const getTextFn = createServerFn({ method: "GET" })
  .validator(slug)
  .handler(async ({ context, data }) => {
    const task = await db
      .select()
      .from(texts)
      .where(and(eq(texts.slug, data), eq(texts.uid, context.session?.user.id ?? "")))
      .fullJoin(todos, eq(texts.tudo, todos.id));

    const md = await ParseToHTML(task.at(0)?.text?.text ?? "");

    return { ...task.at(0)?.text, tudo: task.at(0)?.todo, md };
  });

export const getTextsFn = createServerFn({ method: "GET" })
  .validator(slug)
  .handler(async ({ context, data }) => {
    const tasks = await db
      .select()
      .from(todos)
      .where(and(eq(todos.uid, context.session?.user.id ?? ""), eq(todos.slug, data)))
      .fullJoin(texts, eq(texts.tudo, todos.id));

    const mapped = tasks.map(async ({ text, todo }) => {
      return {
        ...todo,
        tasks: text ? [{ ...text, md: await ParseToHTML(text?.text ?? "") }] : [],
      };
    });

    return { ...(await mapped.at(0)) };
  });

export const getTudosFn = createServerFn({ method: "GET" }).handler(async ({ context }) => {
  return await db
    .select()
    .from(todos)
    .where(eq(todos.uid, context.session?.user.id ?? ""))
    .orderBy(todos.createdAt);
});

export function getTudosQueryOptions() {
  return queryOptions({
    queryKey: ["tudos"],
    queryFn: () => getTudosFn(),
    staleTime: 1000 * 60 * 5,
  });
}

export const getTodoFn = createServerFn()
  .validator(slug)
  .handler(async ({ context, data }) => {
    const tudo = await db
      .select()
      .from(todos)
      .where(and(eq(todos.slug, data), eq(todos.uid, context.session?.user.id ?? "")));

    return { ...tudo.at(0) };
  });

export function getTudoQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ["tudo", slug],
    queryFn: () => getTodoFn({ data: slug }),
    staleTime: 1000 * 60 * 5,
  });
}

export const createTextFn = createServerFn({ method: "POST" })
  .validator(
    v.object({
      text: v.string(),
      tudo: v.string(),
      name: v.string(),
    }),
  )
  .handler(async ({ context, data }) => {
    return await db
      .insert(texts)
      .values({
        text: data.text,
        uid: context.session?.user.id ?? "",
        tudo: data.tudo,
        slug: slugify(data.name.replace(".txt", "")),
        title: data.name.replace(".txt", ""),
      })
      .returning();
  });

export const createTudoFn = createServerFn({ method: "POST" })
  .validator(
    v.object({
      title: v.string(),
      description: v.string(),
    }),
  )
  .handler(async ({ data, context }) => {
    return await db
      .insert(todos)
      .values({
        title: data.title,
        description: data.description,
        completed: false,
        slug: slugify(data.title),
        uid: context.session?.user.id ?? "",
      })
      .returning();
  });

export const updateTudoFn = createServerFn({ method: "POST" })
  .validator(
    v.object({
      title: v.string(),
      description: v.string(),
      slug: v.string(),
    }),
  )
  .handler(async ({ data, context }) => {
    return await db
      .update(todos)
      .set({
        title: data.title,
        description: data.description,
      })
      .where(and(eq(todos.uid, context.session?.user?.id ?? ""), eq(todos.slug, data.slug)))
      .returning();
  });

export const updateTaskCompletedFn = createServerFn({ method: "POST" })
  .validator(
    v.object({
      completed: v.boolean(),
      slug: v.string(),
    }),
  )
  .handler(async ({ context, data }) => {
    const task = await db
      .update(texts)
      .set({
        completed: !data.completed,
      })
      .where(and(eq(texts.slug, data.slug), eq(texts.uid, context.session?.user.id ?? "")))
      .returning({ completed: texts.completed });

    return { ...task.at(0) };
  });

export const updateTudoCompletedFn = createServerFn({ method: "POST" })
  .validator(
    v.object({
      slug: v.string(),
      completed: v.boolean(),
    }),
  )
  .handler(async ({ context, data }) => {
    const tudo = await db
      .update(todos)
      .set({
        completed: !data.completed,
      })
      .where(and(eq(todos.slug, data.slug), eq(todos.uid, context.session?.user?.id ?? "")))
      .returning({ completed: todos.completed });

    return { ...tudo.at(0) };
  });

export const updateTaskFn = createServerFn({ method: "POST" })
  .validator(
    v.object({
      text: v.string(),
      slug: v.string(),
    }),
  )
  .handler(async ({ context, data }) => {
    return await db
      .update(texts)
      .set({
        text: data.text,
      })
      .where(and(eq(texts.slug, data.slug), eq(texts.uid, context.session?.user?.id ?? "")))
      .returning();
  });

export const deleteTudoFn = createServerFn({ method: "POST" })
  .validator(
    v.object({
      slug: v.string(),
    }),
  )
  .handler(async ({ context, data }) => {
    const tudo = await db
      .delete(todos)
      .where(and(eq(todos.uid, context.session?.user?.id ?? ""), eq(todos.slug, data.slug)))
      .returning();

    return { ...tudo.at(0) };
  });

export const deleteTaskFn = createServerFn({ method: "POST" })
  .validator(
    v.object({
      slug: v.string(),
    }),
  )
  .handler(async ({ context, data }) => {
    try {
      const deletedTask = await db
        .delete(texts)
        .where(and(eq(texts.uid, context.session?.user?.id ?? ""), eq(texts.slug, data.slug ?? "")))
        .returning();

      return { ...deletedTask.at(0) };
    } catch (error: any) {
      throw new Error(error);
    }
  });
