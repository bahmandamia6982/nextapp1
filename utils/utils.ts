import { NextRequest } from "next/server";

export const isDevMode = process.env.NODE_ENV

export const createRelativeURL = (req: NextRequest, endpoint: string) => {
  const url = req.nextUrl.clone();
  url.pathname = endpoint;
  return url;
};
