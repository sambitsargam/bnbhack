import React, { useEffect, useState } from "react";
import { Badge, Card, Col, ColGrid, Flex, Text, Title, Callout } from "@tremor/react";
import axios from "axios";

interface Transaction {
  hash: string;
  value: string;
  isError: string;
  blockNumber: string;
  timeStamp: string;
  input: string;
  functionName: string;
  from: string;
  to: string;
}

const InGamePurchaseComponent = ({ address }: { address: string }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Function to fetch transactions from BSCScan API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=1EJJ7YRJBQSJGYUTNXHCUJQFJ1MDZVADBG`
        );

        if (response.data.status === "1") {
          const txData = response.data.result.filter(
            (tx: any) => tx.isError === "0" && tx.input && tx.input !== "0x"
          );
          setTransactions(txData);
        } else {
          setError("Failed to fetch transactions.");
        }
      } catch (error) {
        setError("Error fetching data from BscScan.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [address]);

  if (loading) {
    return <Text>Loading transactions...</Text>;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  const decodeInputData = (input: string, functionName: string) => {
    // Decode the input data based on known function signatures
    if (functionName === "addSubscribersInBulk(address[] subscribers)") {
      return `Subscribers: ${input.slice(10)}`; // This is just an example to show the raw address array data
    } else if (functionName === "subscribe(address tokenAddress, uint256 amount)") {
      return `Token Address: ${input.slice(10, 50)}; Amount: ${parseInt(input.slice(50), 16)}`;
    } else if (functionName === "subscribeNFT(address nftAddress,uint256 tokenID,address tokenAddress,uint256 tokenAmount)") {
      return `NFT Address: ${input.slice(10, 50)}; Token ID: ${parseInt(input.slice(50, 66), 16)}; Token Address: ${input.slice(66, 106)}; Token Amount: ${parseInt(input.slice(106), 16)}`;
    } else {
      return `Input data: ${input}`;
    }
  };

  return (
    <div>
      <Title>In-Game Purchases and Subscriptions</Title>

      {transactions.length === 0 ? (
        <Text>No in-game purchases or subscriptions found for this address.</Text>
      ) : (
        <ColGrid numColsMd={2} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
          {transactions.map((tx, index) => (
            <Col key={index}>
              <Card>
                <Text>Transaction Hash</Text>
                <Text truncate={true}>{tx.hash}</Text>

                <Text>From: {tx.from}</Text>
                <Text>To: {tx.to}</Text>
                <Text>Value: {tx.value} BNB</Text>
                <Text>Status: {tx.isError === "0" ? "Success" : "Failed"}</Text>
                <Text>Block: {tx.blockNumber}</Text>
                <Text>
                  Date: {new Date(Number(tx.timeStamp) * 1000).toLocaleString()}
                </Text>
                <Text>Function: {tx.functionName}</Text>
              </Card>
            </Col>
          ))}
        </ColGrid>
      )}
    </div>
  );
};

export default InGamePurchaseComponent;
