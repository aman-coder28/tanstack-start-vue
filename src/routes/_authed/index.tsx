import { createFileRoute } from "@tanstack/vue-router";

export const Route = createFileRoute("/_authed/")({
  component: Home,
});

function Home() {
  return <h3 class="mb-4">Welcome Home!!!</h3>;
}
