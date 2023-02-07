import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  const users = await fetch(
    "https://api.clerk.dev/v1/users",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}}`,
      }
    }
  );

  console.log(users);

  res.status(200).json(users);
}