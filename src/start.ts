import { createCsrfMiddleware, createMiddleware, createStart } from "@tanstack/vue-start";
import { getRequestHeaders } from "@tanstack/vue-start/server";
import { auth } from "./lib/auth";

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

const sessionMiddleware = createMiddleware().server(async ({ next }) => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({
    headers,
  });

  return await next({
    context: {
      session,
    },
  });
});

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [csrfMiddleware, sessionMiddleware],
  };
});
