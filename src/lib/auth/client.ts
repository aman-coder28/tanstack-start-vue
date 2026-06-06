import { createAuthClient } from "better-auth/vue";

export const authClient = createAuthClient({
  baseURL: import.meta.env.PUBLIC_BETTER_AUTH_URL,
});

export async function signInWithGithub() {
  await authClient.signIn.social({
    provider: "github",
  });
}

export async function signInWithGmail() {
  await authClient.signIn.social({
    provider: "google",
  });
}

export async function signOut() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        location.replace("/");
        location.reload();
      },
    },
  });
}
