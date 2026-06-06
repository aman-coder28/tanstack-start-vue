/// <reference types="vite/client" />
import { Body, HeadContent, Html, Outlet, Scripts, createRootRoute } from "@tanstack/vue-router";
import { TanStackRouterDevtools } from "@tanstack/vue-router-devtools";
import { DefaultCatchBoundary } from "~/components/CatchBoundary";
import { NotFound } from "~/components/NotFound";
import { seo } from "~/utils/seo";
import "./styles.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "TanStack Start | Type-Safe, Client-First, Full-Stack Vue Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack Vue framework.`,
      }),
    ],
    links: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
  component: () => <Outlet />,
});

function RootDocument(_: unknown, { slots }: { slots: any }) {
  return (
    // @ts-ignore
    <Html lang="en">
      <head>
        <HeadContent />
      </head>
      <Body>
        {slots.default?.()}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </Body>
    </Html>
  );
}
