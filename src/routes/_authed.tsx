// import { NavBar } from "@@/header";
import { ServerSessionQueryOptions } from "@db/query.functions";
import { createFileRoute } from "@tanstack/vue-router";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ context }) => {
    // oxlint-disable-next-line typescript/no-floating-promises
    context.queryClient.prefetchQuery(ServerSessionQueryOptions());
  },
});
