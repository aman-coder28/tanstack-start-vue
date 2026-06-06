// import { NavBar } from "@@/header";
import { ServerSessionQueryOptions } from "@db/query.functions";
import { useQuery } from "@tanstack/vue-query";
import { createFileRoute, Outlet } from "@tanstack/vue-router";
import { defineComponent, Suspense } from "vue";

const RouteComponent = defineComponent({
  setup() {
    return () => (
      <>
        <Suspense>
          {{
            default: () => <Home />,
            fallback: () => "Loading Middleman...",
          }}
        </Suspense>
      </>
    );
  },
});

const Home = defineComponent({
  async setup() {
    const query = useQuery(() => ServerSessionQueryOptions());

    await query.suspense();

    return () => {
      const data = query.data.value;

      return (
        <main class="mb-6" id="content">
          {data?.user?.name ? <Outlet /> : <h1>Not Logged In</h1>}
        </main>
      );
    };
  },
});

export const Route = createFileRoute("/_authed")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    // oxlint-disable-next-line typescript/no-floating-promises
    context.queryClient.prefetchQuery(ServerSessionQueryOptions());
  },
});
