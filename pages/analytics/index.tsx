import { NextPage } from "next";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { Geo } from "../../middleware";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Analytics } from "../api/analytics";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json";

const Analytics: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps> | Geo
) => {
  const [analytics, setAnalytics] = useState<Analytics>();

  const fetchAnalytics = async () => {
    const res = await fetch("/api/analytics");
    const analytics = (await res.json()) as Analytics;
    setAnalytics(analytics);
  };

  useEffect(() => {
    fetchAnalytics();

    const interval = setInterval(() => {
      fetchAnalytics();
    }, 1000 * 15);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-12 py-8 sm:px-24 lg:px-32">
      <Head>
        <title>Lance Ellis - Analytics</title>
      </Head>
      <div className="w-full">
        <Link href="/" passHref scroll={false}>
          <a className="py-1 squiggle w-fit">Lance Ellis</a>
        </Link>
      </div>
      <div className="w-full p-4 mt-16 bg-gray-100 rounded-lg shadow-lg">
        <h2>🚀 lanc3.dev</h2>
        <span>
          {Object.keys(analytics?.currentVisits || {}).length} current visitors
        </span>
      </div>
      <div className="w-full p-4 mt-4 bg-gray-100 rounded-lg shadow-lg">
        <h2>Page Visits Today</h2>
        <div className="flex flex-col gap-2 mt-4">
          {Object.keys(analytics?.pages || {}).map((pageKey) => {
            const page = analytics!.pages[pageKey];

            return (
              <div key={pageKey}>
                <h3>{pageKey}</h3>
                <div className="flex flex-col ml-2 text-gray-600">
                  <span>{page.uniqueVisits} unique visits</span>
                  <span>{page.visits} visits</span>
                  <span>
                    {Object.keys(page.currentVisits).length} currennt visitor
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ComposableMap>
        <Geographies geography={geoUrl} className="hover:fill-transparent">
          {({ geographies }) =>
            geographies.map((geo) => {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#C4C4C4"
                  stroke="#C4C4C4"
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: query,
});

export default Analytics;
