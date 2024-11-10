import { Color } from "@tremor/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { randomDate } from "utils";

// Function to generate a random date in 'dayjs' format
const generateRandomDate = (start: Date, end: Date) => {
  return dayjs(randomDate(start, end));
};

// Risk level, score, and status options remain unchanged
export const riskLevel = ["Low", "Medium", "High"];

export const scoreOptions = [
  {
    text: "All Score Levels",
    value: "",
  },
  {
    text: "High",
    value: "High",
  },
  {
    text: "Medium",
    value: "Medium",
  },
  {
    text: "Low",
    value: "Low",
  },
];

export const riskOptions = [
  {
    text: "All Risk Levels",
    value: "",
  },
  {
    text: "High",
    value: "High",
  },
  {
    text: "Medium",
    value: "Medium",
  },
  {
    text: "Low",
    value: "Low",
  },
];

export const statusOptions = [
  {
    text: "All Statuses",
    value: "",
  },
  {
    text: "Whitelist",
    value: "whitelist",
  },
  {
    text: "Suspicious",
    value: "Suspicious",
  },
  {
    text: "Flagged",
    value: "Flagged",
  },
];

export const rounds = [
  {
    text: "All Games",
    value: "all",
  },
  {
    text: "Game 1",
    value: "fantom",
  },
  {
    text: "Game 2",
    value: "gr15",
  },
];

// Function to generate metrics for address
export const addressMetrics = [
  {
    title: "Wallet Creation Date",
    metric: generateRandomDate(new Date(2022, 0, 1), new Date()).format("MMM DD, YYYY"),
    extra: generateRandomDate(new Date(2022, 0, 1), new Date()).fromNow(),
  },
  {
    title: "Number of transactions",
    metric: Math.floor(Math.random() * (300 + 1)) + 0,
  },
  {
    title: "Last activity date",
    metric: generateRandomDate(new Date(2024, 0, 1), new Date()).format("MMM DD, YYYY"),
    extra: generateRandomDate(new Date(2024, 0, 1), new Date()).fromNow(),
  },
];

// Function to ensure last transaction is not before wallet creation
const validateTransactionDates = (walletCreationDate: string, lastActivityDate: string): boolean => {
  const creationDate = dayjs(walletCreationDate);
  const activityDate = dayjs(lastActivityDate);

  return activityDate.isAfter(creationDate); // Returns true if activity is after wallet creation
};

// Category data with additional logic to check date
type Category = {
  title: string;
  metric: string;
  metricPrev: string;
  percentage: string;
  color: Color;
};

export const categories: Record<string, Category[]> = {
  ["all"]: [
    {
      title: "Suspicious Users",
      metric: "1,633",
      metricPrev: "7,509",
      percentage: "27%",
      color: "orange",
    },
    {
      title: "Flagged Users",
      metric: "1251",
      metricPrev: "7,509",
      percentage: "21%",
      color: "rose",
    },
    {
      title: "Whitelisted Users",
      metric: "3,827",
      metricPrev: "7,509",
      percentage: "52%",
      color: "sky",
    },
  ],
  ["gr15"]: [
    {
      title: "Suspicious Users",
      metric: "1,156",
      metricPrev: "4,323",
      percentage: "26.7%",
      color: "orange",
    },
    {
      title: "Flagged Users",
      metric: "933",
      metricPrev: "4,323",
      percentage: "21.6%",
      color: "rose",
    },
    {
      title: "Whitelisted Users",
      metric: "2,234",
      metricPrev: "4,323",
      percentage: "51.7%",
      color: "sky",
    },
  ],
  ["fantom"]: [
    {
      title: "Suspicious Users",
      metric: "477",
      metricPrev: "3,186",
      percentage: "30%",
      color: "orange",
    },
    {
      title: "Flagged Users",
      metric: "318",
      metricPrev: "3,186",
      percentage: "20%",
      color: "rose",
    },
    {
      title: "Whitelisted Users",
      metric: "1593",
      metricPrev: "3,186",
      percentage: "50%",
      color: "sky",
    },
  ],
};

// Example usage of validateTransactionDates (for reference, this part could be used in the UI or data display logic)
const walletCreationDate = "Jan 01, 2023"; // Example, would come from the real data
const lastActivityDate = "Feb 15, 2023"; // Example, would come from the transaction data

if (validateTransactionDates(walletCreationDate, lastActivityDate)) {
  console.log("The last transaction is valid and after the wallet creation date.");
} else {
  console.log("The last transaction occurred before the wallet creation date.");
}
