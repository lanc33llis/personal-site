import type { NextApiRequest, NextApiResponse } from "next";

// this is not persistent data, it will be reset every time the server restarts. Needs to be stored in a DB, will probably use MongoDB with vercel production secrets

type IP = string;
type Visitor = { country: string; lat: number; long: number };

interface PageAnalytics {
  ips: { [ip: IP]: Visitor };
  currentVisits: { [ip: IP]: number };
  visits: number;
  uniqueVisits: number;
}

export type Analytics = {
  ips: { [ip: IP]: Visitor };
  currentVisits: { [ip: IP]: number };
  pages: {
    [page: string]: PageAnalytics;
  };
};

const analytics: Analytics = {
  ips: {},
  currentVisits: {},
  pages: {
    "/": {
      ips: {},
      currentVisits: {},
      visits: 0,
      uniqueVisits: 0,
    },
    "/about": {
      ips: {},
      currentVisits: {},
      visits: 0,
      uniqueVisits: 0,
    },
    "/projects": {
      ips: {},
      currentVisits: {},
      visits: 0,
      uniqueVisits: 0,
    },
    "/analytics": {
      ips: {},
      currentVisits: {},
      visits: 0,
      uniqueVisits: 0,
    },
  },
};

const updateInterval = 1000 * 60 * 5; // 5 minutes
function updateAnalytics() {
  console.log("Updating analytics...");

  const currVisitors = Object.keys(analytics.currentVisits);
  const time = new Date();
  const currTime = time.getTime();
  currVisitors.forEach((ip) => {
    const timeOfVisit = analytics.currentVisits[ip];
    if (currTime - timeOfVisit > updateInterval) {
      delete analytics.currentVisits[ip];
    }
  });

  Object.keys(analytics.pages).forEach((page) => {
    const currVisitors = Object.keys(analytics.pages[page].currentVisits);
    currVisitors.forEach((ip) => {
      const timeOfVisit = analytics.pages[page].currentVisits[ip];
      if (currTime - timeOfVisit > updateInterval) {
        delete analytics.pages[page].currentVisits[ip];
      }
    });
  });
}
setInterval(updateAnalytics, updateInterval);

function newVisitorEvent(
  ip: IP,
  page: string,
  country: string,
  lat: number,
  long: number
) {
  const time = new Date();
  analytics.ips[ip] = { country, lat, long };
  analytics.currentVisits[ip] = time.getTime();
  if (!(ip in analytics.pages[page].ips)) {
    analytics.pages[page].uniqueVisits++;
  }
  analytics.pages[page].ips[ip] = { country, lat, long };
  analytics.pages[page].currentVisits[ip] = time.getTime();
  analytics.pages[page].visits++;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { ip, country, lat, long, page } = req.body;

    if (ip) {
      newVisitorEvent(ip, page, country, lat, long);
    }

    res.status(200).json({ success: true });
  } else if (req.method === "GET") {
    res.status(200).json(analytics);
  }
}
