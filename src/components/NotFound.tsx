import { Link } from "@tanstack/vue-router";

export function NotFound({ children }: { children?: any }) {
  return (
    <div class="space-y-2 p-2" data-testid="default-not-found-component">
      <div class="text-gray-600 dark:text-gray-400">
        {children || <p>The page you are looking for does not exist.</p>}
      </div>
      <p class="flex flex-wrap items-center gap-2">
        <button
          onClick={() => window.history.back()}
          class="rounded-sm bg-emerald-500 px-2 py-1 text-sm font-black text-white uppercase"
        >
          Go back
        </button>
        <Link
          to="/"
          class="rounded-sm bg-cyan-600 px-2 py-1 text-sm font-black text-white uppercase"
        >
          Start Over
        </Link>
      </p>
    </div>
  );
}
