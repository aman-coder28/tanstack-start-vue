// import { NavBar } from "@@/header";
import { ServerSessionQueryOptions } from "@db/query.functions";
import { useQuery } from "@tanstack/vue-query";
import { createFileRoute, Outlet } from "@tanstack/vue-router";

export const Route = createFileRoute("/_authed")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    await context.queryClient.prefetchQuery(ServerSessionQueryOptions());
  },
});

function RouteComponent() {
  const query = useQuery(() => ServerSessionQueryOptions());

  return (
    <main class="mb-6" id="content">
      {query.data.value?.user?.name ? <Outlet /> : <h1>Not Logged In</h1>}
    </main>
  );
}
