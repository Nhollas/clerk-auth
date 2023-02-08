import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  const createActorToken = async (userId: string, targetUserId: string) => {
    const createdToken = await fetch(
      "https://api.clerk.dev/v1/actor_tokens",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
        body: JSON.stringify({
          user_id: userId,
          expires_in_seconds: 60 * 60 * 24,
          actor: {
            sub: targetUserId
          }
        }),
      }
    ).then((res) => res.json());

    return createdToken;
  };

  const { userId, targetUserId } = req.query;

  const token = await createActorToken(userId as string, targetUserId as string);

  console.log(token); 

  res.status(200).json(token);
}