import { ErrorComponent, Link, useLocation, useRouter } from "@tanstack/vue-router";
import type { ErrorComponentProps } from "@tanstack/vue-router";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useLocation({
    select: (location) => location.pathname === "/",
  });

  console.error(error);

  return (
    <div class="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 p-4">
      <ErrorComponent error={error} />
      <div class="flex flex-wrap items-center gap-2">
        <button
          onClick={async () => {
            await router.invalidate();
          }}
          class={`rounded-sm bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700`}
        >
          Try Again
        </button>
        {isRoot.value ? (
          <Link
            to="/"
            class={`rounded-sm bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700`}
          >
            Home
          </Link>
        ) : (
          <Link
            to="/"
            class={`rounded-sm bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700`}
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
          >
            Go Back
          </Link>
        )}
      </div>
    </div>
  );
}
