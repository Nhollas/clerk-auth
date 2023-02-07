import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  const createSignInToken = async (userId: string) => {
    const createdToken = await fetch(
      "https://api.clerk.dev/v1/sign-in-tokens",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}}`,
        },
        body: JSON.stringify({
          user_id: userId,
          expires_in_seconds: 60 * 60 * 24,
        }),
      }
    );

    console.log(createdToken);

    return createdToken;
  };

  const { userId } = req.query;

  const token = await createSignInToken(userId as string);

  res.status(200).json(token);
}