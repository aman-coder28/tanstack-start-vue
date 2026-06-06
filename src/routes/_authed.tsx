import { ServerSessionQueryOptions } from "@db/query.functions";
import { useQuery } from "@tanstack/vue-query";
import { createFileRoute } from "@tanstack/vue-router";
import { Outlet } from "@tanstack/vue-router";
import NavBar from "@/components/header/index.vue";

export const Route = createFileRoute("/_authed")({
  component: RootComponent,
  beforeLoad: async ({ context }) => {
    await context.queryClient.prefetchQuery(ServerSessionQueryOptions());
  },
});

function RootComponent() {
  const { data } = useQuery(() => ServerSessionQueryOptions());

  return (
    <section>
      <NavBar user={data?.value?.user} />

      {data?.value?.user?.name ? <Outlet /> : <h1>Not Logged In</h1>}
    </section>
  );
}
