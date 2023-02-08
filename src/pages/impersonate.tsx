import { useUser, useSignIn, useClerk, useAuth } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/api";
import { useEffect, useState } from "react";
import axios from "axios";

const Impersonate = () => {
  const { signIn, setSession } = useSignIn();
  const { user } = useUser();
  const { userId, actor } = useAuth();
  const { signOut } = useClerk();

  const [impersonationToken, setImpersonationToken] = useState<any>(null);

  const [users, setUsers] = useState<User[] | null>(null);

  const fetchActorToken = async (userId: string, targetUserId: string) => {
    const { data: createdToken } = await axios.get(
      `/api/token?userId=${userId}&targetUserId=${targetUserId}`
    );

    console.log(createdToken);

    setImpersonationToken(createdToken);
  };

  useEffect(() => {
    if (!impersonationToken || !signIn || !setSession) {
      return;
    }

    signOut(() => {
      window.location.href = `/sign-in?__clerk_ticket=${impersonationToken.token}`;
    });
  }, [impersonationToken, signIn, setSession, signOut]);

  useEffect(() => {
    if (users) {
      return;
    }

    const fetchUsers = async () => {
      const { data: users } = await axios.get<User[]>("/api/users", {
        method: "GET",
      });

      if (!users) {
        return;
      }

      setUsers(users);
    };

    fetchUsers();
  }, [users]);

  return (
    <div className='text-black'>
      <div className='flex flex-col gap-y-3'>
        <h1 className='text-xl font-semibold'>Users to impersonate</h1>
        <ul className='flex flex-col gap-y-4'>
          {users && user ? (
            users
              .filter((u) => u.id !== user.id)
              .map((u) => (
                <li key={u.id}>
                  <button
                    className='bg-gray-100 border border-gray-300 font-medium px-6 py-2 rounded-md'
                    onClick={() => fetchActorToken(user.id, u.id)}
                  >
                    {u.username}
                  </button>
                </li>
              ))
          ) : (
            <div className='font-medium'>Loading users...</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Impersonate;
