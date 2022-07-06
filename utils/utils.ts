import { NextRequest } from "next/server";

export const createRelativeURL = (req: NextRequest, endpoint: string) => {
  const url = req.nextUrl.clone();
  url.pathname = endpoint;
  return url;
};
