import { ServerSessionQueryOptions } from "@db/query.functions";
import { createFileRoute } from "@tanstack/vue-router";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ context }) => {
    await context.queryClient.prefetchQuery(ServerSessionQueryOptions());
  },
});
