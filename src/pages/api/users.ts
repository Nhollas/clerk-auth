import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res : NextApiResponse) {

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
  }

  const { data } = await axios.get("https://api.clerk.dev/v1/users", config);

    return res.status(200).json(data); 
}