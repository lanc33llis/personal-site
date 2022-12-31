import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export type Geo = {
  country: string;
  lat: number;
  long: number;
};

export function middleware(req: NextRequest) {
  if (
    new RegExp(
      /^.*(fonts|_next|vk.com|favicon|x-icon|svg+xml|png|svg|api).*$/
    ).test(req.url)
  ) {
    return NextResponse.next();
  }

  const { nextUrl: url, geo } = req;
  const { ip } = (req?.ip && req) || { ip: "0.0.0.0" };
  const {
    country,
    latitude: lat,
    longitude: long,
  } = (geo?.country && geo) || {
    country: "USA",
    latitude: 29.504307,
    longitude: -98.536653,
  };

  url.searchParams.set("country", (country && country) || "");
  url.searchParams.set("lat", lat?.toString() || "");
  url.searchParams.set("long", long?.toString() || "");

  const apiUrl = url.clone();
  apiUrl.pathname = "/api/analytics";
  apiUrl.search = "";
  fetch(apiUrl.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ip,
      country,
      lat,
      long,
      page: url.pathname,
    }),
  });

  return NextResponse.rewrite(url);
}
