import type { NextApiRequest, NextApiResponse } from "next";
import Analytics from "../../mongoose/AnalyticsSchema";
import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@${process.env.MONGODB_ATLAS_CLUSTER}.ucnafm0.mongodb.net/?retryWrites=true&w=majority`;

const updateInterval = 1000 * 60 * 5; // 5 minutes
async function updateAnalytics() {
  console.log("Updating analytics...");

  await mongoose.connect(MONGODB_URI);
  let analytics = await Analytics.findOne({
    date: new Date().toLocaleDateString(),
  });
  if (!analytics) {
    analytics = new Analytics();
    await analytics.save();
  }

  const currVisitors = Object.keys(analytics.currentVisits);
  const time = new Date();
  const currTime = time.getTime();
  currVisitors.forEach((ip) => {
    const timeOfVisit = analytics!.currentVisits[ip];
    if (currTime - timeOfVisit > updateInterval) {
      delete analytics!.currentVisits[ip];
    }
  });

  Object.keys(analytics.pages).forEach((page) => {
    const currVisitors = Object.keys(analytics!.pages[page].currentVisits);
    currVisitors.forEach((ip) => {
      const timeOfVisit = analytics!.pages[page].currentVisits[ip];
      if (currTime - timeOfVisit > updateInterval) {
        delete analytics!.pages[page].currentVisits[ip];
      }
    });
  });

  analytics.markModified("ips");
  analytics.markModified("currentVisits");
  analytics.markModified("pages");

  await analytics.save();
}
setInterval(updateAnalytics, updateInterval);

async function newVisitorEvent(
  ip: string,
  page: string,
  country: string,
  lat: number,
  long: number
) {
  await mongoose.connect(MONGODB_URI);

  let analytics = await Analytics.findOne({
    date: new Date().toLocaleDateString(),
  });
  if (!analytics) {
    analytics = new Analytics();
  }

  const time = new Date();
  analytics.ips[ip] = { country, lat, long };
  analytics.currentVisits[ip] = time.getTime();
  if (!analytics.pages[page]) {
    analytics.pages[page] = {
      ips: {},
      currentVisits: {},
      visits: 0,
      uniqueVisits: 0,
    };
  }

  if (!(ip in analytics.pages[page].ips)) {
    analytics.pages[page].uniqueVisits++;
  }

  analytics.pages[page].ips[ip] = { country, lat, long };
  analytics.pages[page].currentVisits[ip] = time.getTime();
  analytics.pages[page].visits++;

  analytics.markModified("ips");
  analytics.markModified("currentVisits");
  analytics.markModified("pages");

  await analytics.save();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { ip, country, lat, long, page } = req.body;

    if (ip) {
      await newVisitorEvent(ip, page, country, lat, long);
    }

    res.status(200).json({ success: true });
  } else if (req.method === "GET") {
    await mongoose.connect(MONGODB_URI);

    let analytics = await Analytics.findOne({
      date: new Date().toLocaleDateString(),
    });
    if (!analytics) {
      analytics = new Analytics();
      await analytics.save();
    }

    res.status(200).json(analytics);
  }
}
