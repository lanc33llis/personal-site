import { NextPage } from "next";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { Geo } from "../../middleware";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Analytics } from "../../mongoose/AnalyticsSchema";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json";

const Analytics: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps> | Geo
) => {
  const [analytics, setAnalytics] = useState<Analytics>();
  const [t, setT] = useState(5);

  const fetchAnalytics = async () => {
    const res = await fetch("/api/analytics");
    const analytics = (await res.json()) as Analytics;
    setAnalytics(analytics);
  };

  useEffect(() => {
    fetchAnalytics();

    const fetchInterval = setInterval(() => {
      fetchAnalytics();
    }, 1000 * 5);
    const tInterval = setInterval(() => {
      setT((t) => {
        if (t === 1) return 5;
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(tInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 sm:px-8 lg:px-12">
      <Head>
        <title>Lance Ellis - Analytics</title>
      </Head>
      <div className="w-full">
        <Link href="/" passHref scroll={false}>
          <a className="py-1 squiggle w-fit">Lance Ellis</a>
        </Link>
      </div>
      <span className="flex items-center justify-start w-full gap-2 py-2 mt-16 text-gray-500">
        Refreshing in {t} seconds{" "}
        <span
          className="cursor-pointer material-symbols-outlined"
          onClick={() => fetchAnalytics()}
        >
          refresh
        </span>
      </span>
      <div className="w-full p-4 bg-gray-100 rounded-lg shadow-lg">
        <h2>🚀 lanc3.dev</h2>
        <span>
          {Object.keys(analytics?.currentVisits || {}).length} current visitors
        </span>
      </div>
      <div className="w-full p-4 mt-4 bg-gray-100 rounded-lg shadow-lg">
        <h2>Page Visits Today</h2>
        <div className="flex flex-col gap-2 mt-4">
          {Object.keys(analytics?.pages || {})
            .sort()
            .map((pageKey) => {
              const page = analytics!.pages[pageKey];

              return (
                <div key={pageKey}>
                  <h3>{pageKey}</h3>
                  <div className="flex flex-col ml-2 text-gray-600">
                    {Object.keys(page?.currentVisits || {}).length} current
                    visitors
                    <span>{page.uniqueVisits} unique visits</span>
                    <span>{page.visits} visits</span>
                    <span></span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="w-full p-4 mt-4 bg-gray-100 rounded-lg shadow-lg">
        <h2>Page Visits Today Mapped</h2>
        <ComposableMap
          viewBox="0 0 850 500"
          className="w-full pointer-events-none"
        >
          <Geographies geography={geoUrl} className="w-full ">
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
          {Object.keys(analytics?.ips || {}).map((ip) => {
            const visitor = analytics!.ips[ip];
            return (
              <Marker key={ip} coordinates={[visitor.long, visitor.lat]}>
                <circle r={4} fill="#F53" />
              </Marker>
            );
          })}
        </ComposableMap>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: query,
});

export default Analytics;
