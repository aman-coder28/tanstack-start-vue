import { createFileRoute } from "@tanstack/vue-router";
import Counter from "~/components/counter.vue";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div class="m-7">
      <h3 class="mb-4">Welcome Home!!!</h3>

      <Counter />
    </div>
  );
}
