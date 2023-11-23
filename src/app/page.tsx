import { ButtonReset } from "@/components/button-reset";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email?: any;
  hireable?: any;
  bio: string;
  twitter_username?: any;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

async function getUser(name?: string) {
  if (!name) return null;
  const response = await fetch(
    `https://api.github.com/users/${name.replace(/\s/g, "").toLowerCase()}`
  );
  if (!response.ok && response.status === 404) {
    // redirect to custom 404 page if user not found
    redirect("user-not-found");
  }
  return (await response.json()) as User;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { name: string };
}) {
  const user = await getUser(searchParams.name);

  return (
    <>
      {user ? (
        <div className="grid grid-flow-col gap-x-6">
          <div>
            <div className="flex items-center gap-4">
              <Image
                src={user.avatar_url}
                alt="user avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="text-white">{user.name}</p>
            </div>
            {user.bio && (
              <div className="my-4">
                <span>Bio:</span>
                <p className="leading-relaxed text-white max-w-full break-words text-ellipsis line-clamp-3">
                  {user.bio}
                </p>
              </div>
            )}
          </div>
          <ButtonReset />
        </div>
      ) : (
        <search>
          <form className="flex items-center gap-2">
            <input
              type="text"
              name="name"
              placeholder="Search for a user"
              className="rounded-md border placeholder-zinc-600 border-zinc-800 px-2 h-10 bg-transparent"
              required
            />
            <button
              type="submit"
              className="rounded-md px-2 h-10 bg-zinc-500 hover:bg-zinc-600 transition-colors"
            >
              Search
            </button>
          </form>
        </search>
      )}
    </>
  );
}
