import { createFileRoute } from "@tanstack/vue-router";

export const Route = createFileRoute("/_authed/")({
  component: Home,
});

function Home() {
  return (
    <div class="m-7">
      <h3 class="mb-4">Welcome Home!!!</h3>
    </div>
  );
}
