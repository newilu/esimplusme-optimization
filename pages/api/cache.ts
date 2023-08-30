import { NextApiRequest, NextApiResponse } from "next";
import redis from "@/lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cachekey } = req.headers;

  if (req.method === "GET") {
    // try fetch cached data
    const cached = await redis.get(cachekey as string);

    // if cached, we're good!
    if (cached) {
      return res.send(cached);
    }

    return res.status(404).json("");
  }

  if (req.method === "POST") {
    const MAX_AGE = 60_000 * 60; // 1 hour
    const EXPIRY_MS = `PX`; // milliseconds

    // cache data
    await redis.set(
      cachekey as string,
      JSON.stringify(req.body),
      EXPIRY_MS,
      MAX_AGE
    );

    return res.status(200).json({});
  }

  res.status(400).json("");
}
