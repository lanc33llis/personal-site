import mongoose from "mongoose";

type IP = string;
type Visitor = { country: string; lat: number; long: number };

interface PageAnalytics {
  ips: { [ip: IP]: Visitor };
  currentVisits: { [ip: IP]: number };
  visits: number;
  uniqueVisits: number;
}

export type Analytics = {
  date: String;
  ips: { [ip: IP]: Visitor };
  currentVisits: { [ip: IP]: number };
  pages: {
    [page: string]: PageAnalytics;
  };
};

const AnalyticsSchema = new mongoose.Schema<Analytics>({
  date: {
    type: String,
    required: true,
    default: new Date().toLocaleDateString(),
  },
  ips: {
    type: Object,
    required: true,
    default: {},
  },
  currentVisits: {
    type: Object,
    required: true,
    default: {},
  },
  pages: {
    type: Object,
    required: true,
    default: {},
  },
});

export default (mongoose.models.Analytics as mongoose.Model<
  Analytics,
  {},
  {},
  {},
  mongoose.Schema<
    Analytics,
    mongoose.Model<Analytics, any, any, any, any>,
    {},
    {},
    {},
    {},
    mongoose.DefaultSchemaOptions,
    Analytics
  >
>) || mongoose.model("Analytics", AnalyticsSchema);
