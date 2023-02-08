import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const { userId, actor } = useAuth();

  return (
    <div className='flex flex-row gap-x-4'>
      {actor && (
        <div className='text-black'>
          <p className="font-medium">
            <span>User {actor.sub} has </span>}
            signed in as user {userId}
          </p>
        </div>
      )}
      {user ? (
        <button
          className='border bg-red-500 py-2 px-8 text-base font-medium text-white hover:border-main-blue hover:bg-gray-50 hover:text-black'
          onClick={() => signOut()}
        >
          Sign out {user?.username}
        </button>
      ) : (
        <Link
          className='border bg-blue-500 py-2 px-8 text-base font-medium text-white hover:border-main-blue hover:bg-gray-50 hover:text-black'
          href={"/sign-in"}
        >
          Sign In
        </Link>
      )}
      <Link
        className='border bg-emerald-500 py-2 px-8 text-base font-medium text-white hover:border-main-blue hover:bg-gray-50 hover:text-black'
        href={"/impersonate"}
      >
        Impersonate a User
      </Link>
    </div>
  );
}
