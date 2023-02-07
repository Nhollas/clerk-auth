import { useUser, useSignIn, useAuth } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/api";
import { useEffect, useState } from "react";

const Impersonate = () => {
  const { signIn, setSession } = useSignIn();
  const { user } = useUser();
  const [signInProcessed, setSignInProcessed] = useState<boolean>(false);

  const [impersonationToken, setImpersonationToken] = useState<string | null>(
    null
  );

  const [users, setUsers] = useState<User[]>([]);

  const fetchSignInToken = async (userId: string) => {
    const createdToken = await fetch(`/api/token?userId=${userId}`, {
      method: "GET",
    });

    setImpersonationToken(createdToken.body as unknown as string);
  };

  useEffect(() => {
    if (!impersonationToken || !signIn || !setSession) {
      return;
    }

    const aFunc = async () => {
      try {
        // Create a signIn with the token, note that you need to use the "ticket" strategy.
        const res = await signIn.create({
          strategy: "ticket",
          ticket: impersonationToken,
        });

        setSession(res.createdSessionId, () => {
          setSignInProcessed(true);
        });
      } catch (err) {
        setSignInProcessed(true);
      }
    };

    aFunc();
  }, [impersonationToken, signIn, setSession]);

  useEffect(() => {
    if (users.length !== 0) {
      return;
    }

    const fetchUsers = async () => {
      const response = await fetch("/api/users", {
        method: "GET",
      });

      if (!response) {
        return;
      }

      setUsers(response.body as unknown as User[]);
    };

    fetchUsers();
  }, [users]);

  if (!impersonationToken) {
    return (
      <div>
        <p>no token provided.</p>
        <ul>
          {users?.map((user) => (
            <li key={user.id}>
              <button onClick={() => fetchSignInToken(user.id)}>
                Impersonate {user.username}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!signInProcessed) {
    return <div>loading</div>;
  }

  if (!user) {
    return <div>error invalid token</div>;
  }

  return <div>Signed in as {user.username}</div>;
};

export default Impersonate;
