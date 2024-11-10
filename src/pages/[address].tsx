import {
  Badge,
  Block,
  Card,
  CategoryBar,
  Col,
  ColGrid,
  Flex,
  List,
  ListItem,
  Metric,
  ProgressBar,
  Text,
  Title,
  Callout,
} from "@tremor/react";
import { ExternalLink } from "lucide-react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import truncateEthAddress from "truncate-eth-address";
import { addressMetrics, rounds } from "../../data";
import { GameContributions } from "../../components/GameContributions";

// Define the risk item type for better type management
type RiskItem = {
  name: string;
  score: number;
  level: string;
};

// Initial risk categories specifically tailored for game data
const initialRiskList: RiskItem[] = [
  { name: "High Transaction Frequency", score: 40, level: "$5000" },
  { name: "Suspicious IP Matching", score: 55, level: "$3000" },
  { name: "Duplicate Accounts", score: 70, level: "$7000" },
  { name: "Unusual Login Patterns", score: 60, level: "$4000" },
];

// Function to calculate the overall Sybil risk score based on game activity
const calculateOverallRiskScore = (riskList: RiskItem[]): number => {
  const totalScore = riskList.reduce((acc: number, risk: RiskItem) => acc + risk.score, 0);
  return Math.round(totalScore / riskList.length);
};

// Mock function to simulate fetching real-time game transaction data
const getTransactionData = async (): Promise<RiskItem[]> => {
  return [
    { name: "High Transaction Frequency", score: Math.floor(Math.random() * 100), level: "$5000" },
    { name: "Suspicious IP Matching", score: Math.floor(Math.random() * 100), level: "$3000" },
    { name: "Duplicate Accounts", score: Math.floor(Math.random() * 100), level: "$7000" },
    { name: "Unusual Login Patterns", score: Math.floor(Math.random() * 100), level: "$4000" },
  ];
};

const AddressDetails: NextPage = () => {
  const [riskList, setRiskList] = useState<RiskItem[]>(initialRiskList);
  const [overallRiskScore, setOverallRiskScore] = useState(
    calculateOverallRiskScore(initialRiskList)
  );
  const [round, setRound] = useState(rounds[0].value);
  const router = useRouter();

  useEffect(() => {
    const updateRiskScores = async () => {
      const updatedRiskList = await getTransactionData();
      setRiskList(updatedRiskList);
      setOverallRiskScore(calculateOverallRiskScore(updatedRiskList));
    };

    // Set interval to update risk scores every 30 seconds
    const interval = setInterval(updateRiskScores, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <Head>
        <title>Game Sybil Detection Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mb-40">
        <Flex justifyContent="justify-start" spaceX="space-x-4">
          <Title>Player: {router.query.address}</Title>
          <Badge text="Verified" color="sky" />
        </Flex>

        <Flex>
          <a
            className="cursor-pointer flex items-center"
            href={`https://bscscan.com/address/${router.query.address}`}
            target={"_blank"}
            rel={"noreferrer"}
          >
            <div className="mr-1 text-blue-500">
              {router.query.address ? truncateEthAddress(router.query.address as string) : ""}
            </div>
            <ExternalLink size={12} color="#3b82f6" strokeWidth={2.5} />
          </a>
        </Flex>

        <nav className="flex my-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </Link>
            </li>
            <li aria-current="page">
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                {router?.query?.address
                  ? truncateEthAddress(router?.query?.address as string)
                  : ""}
              </span>
            </li>
          </ol>
        </nav>

        <Callout
          title=""
          text="This dashboard visualizes real-time and historical player data for Sybil detection in a Web3 game environment."
          color="yellow"
          marginTop="mt-6"
        />

        <ColGrid numColsMd={4} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
          {addressMetrics.map((item) => (
            <Card key={item.title}>
              <Flex alignItems="items-start">
                <Text>{item.title}</Text>
              </Flex>
              <Flex
                justifyContent="justify-start"
                alignItems="items-baseline"
                spaceX="space-x-3"
                truncate={true}
                marginTop="mt-3"
              >
                <Metric>{item.metric}</Metric>
                <Text>{item.extra}</Text>
              </Flex>
            </Card>
          ))}
          <Card>
            <Flex alignItems="items-start">
              <Text>Overall Sybil Risk Score</Text>
              <Badge text={`${overallRiskScore}%`} color="yellow" />
            </Flex>
            <CategoryBar
              marginTop="mt-3"
              categoryPercentageValues={[25, 25, 25, 25]}
              colors={["rose", "orange", "yellow", "emerald"]}
              percentageValue={overallRiskScore}
              showAnimation
              tooltip={`${overallRiskScore}%`}
            />
          </Card>
        </ColGrid>

        <ColGrid marginTop="mt-6" numColsMd={3} gapX="gap-x-6" gapY="gap-y-6">
          <Col numColSpanMd={1}>
            <Card>
              <Title>Game Sybil Risk Scores</Title>
              <List marginTop="mt-4">
                {riskList.map((risk) => (
                  <ListItem key={risk.name}>
                    <Block>
                      <Flex>
                        <Text>{risk.name}</Text>
                        <Text>{risk.score + " %"}</Text>
                      </Flex>
                      <ProgressBar
                        marginTop="mt-4"
                        color={"blue"}
                        percentageValue={risk.score}
                        showAnimation
                        tooltip={`${risk.score}%`}
                      />
                    </Block>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Col>
          <Col numColSpanMd={2}>
            <Card>
              <GameContributions roundName={"Game1"} isFirstIndex />
            </Card>
            <Card marginTop="mt-6">
              <GameContributions roundName={"Game2"} isFirstIndex={false} />
            </Card>
            <Card marginTop="mt-6">
              <GameContributions roundName={"Game3"} isFirstIndex={false} />
            </Card>
          </Col>
        </ColGrid>
      </main>
    </div>
  );
};

export default AddressDetails;
