import {
  Badge,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import { useRouter } from "next/router";

// Define a type for the transaction structure
interface Transaction {
  transactionID: string;
  address: string;
  gameplayDate: string;
  amount: string;
}

// Define the type for the round transactions
interface RoundTransactions {
  [key: string]: Transaction[];  // Dynamic index signature, allowing 'Game1', 'Game2', 'Game3' as keys
}

// Helper function to generate a random transaction ID
const generateTransactionID = (): string => {
  const chars = "0123456789abcdef";
  let txID = "0x";
  for (let i = 0; i < 64; i++) {
    txID += chars[Math.floor(Math.random() * chars.length)];
  }
  return txID;
};

// Helper function to generate a random date in 'dd-mm-yyyy' format
const generateRandomDate = (): string => {
  const start = new Date(2022, 0, 1); // Start from Jan 1, 2022
  const end = new Date(); // Up to the current date
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  const day = ("0" + randomDate.getDate()).slice(-2);
  const month = ("0" + (randomDate.getMonth() + 1)).slice(-2);
  const year = randomDate.getFullYear();
  return `${day}-${month}-${year}`;
};

// Helper function to generate random transaction amounts
const generateRandomAmount = (): string => {
  const amounts = ["10.00 BUSD", "20.50 BUSD", "30.00 BUSD", "50.00 BUSD"];
  return amounts[Math.floor(Math.random() * amounts.length)];
};

// Sample rounds for games
const roundTransactions: RoundTransactions = {
  Game1: Array.from({ length: Math.max(1, Math.floor(Math.random() * 4)) }, () => ({
    transactionID: generateTransactionID(),
    address: "0x" + Math.random().toString(16).substr(2, 40), // Random address
    gameplayDate: generateRandomDate(),
    amount: generateRandomAmount(),
  })),
  Game2: Array.from({ length: Math.max(1, Math.floor(Math.random() * 4)) }, () => ({
    transactionID: generateTransactionID(),
    address: "0x" + Math.random().toString(16).substr(2, 40), // Random address
    gameplayDate: generateRandomDate(),
    amount: generateRandomAmount(),
  })),
  Game3: Array.from({ length: Math.max(1, Math.floor(Math.random() * 4)) }, () => ({
    transactionID: generateTransactionID(),
    address: "0x" + Math.random().toString(16).substr(2, 40), // Random address
    gameplayDate: generateRandomDate(),
    amount: generateRandomAmount(),
  })),
};

export function GameContributions({
  roundName,
  isFirstIndex,
}: {
  roundName: keyof RoundTransactions;  // Ensure that roundName can only be 'Game1', 'Game2', or 'Game3'
  isFirstIndex: boolean;
}) {
  const router = useRouter();

  // Log roundName for debugging
  console.log("Round Name received:", roundName);

  // Fetch transactions based on the selected round name
  const transactions = roundTransactions[roundName] || [];  // Default to empty array if no match
  
  // Log available rounds and transactions
  console.log("Available rounds:", roundTransactions);
  console.log("Transactions for this round:", transactions);

  return (
    <>
      <Flex
        justifyContent="justify-start"
        spaceX="space-x-2"
        marginTop={isFirstIndex ? "mt-1" : "mt-8"}
      >
        <Title>{roundName} Contributions</Title>
        <Badge text={transactions.length.toString()} color="blue" />
      </Flex>
      <Text marginTop="mt-2">List of contributions for {roundName}</Text>
      
      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Transaction ID</TableHeaderCell>
            <TableHeaderCell>Gameplay Date</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Amount</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((item: Transaction) => (
              <TableRow key={item.transactionID}>
                <TableCell>
                  <a
                    href={`https://bscscan.com/tx/${item.transactionID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {item.transactionID.slice(0, 10)}...{item.transactionID.slice(-10)}
                  </a>
                </TableCell>
                <TableCell>{item.gameplayDate}</TableCell>
                <TableCell textAlignment="text-right">{item.amount}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell textAlignment="text-center">
                No transactions found for this round. Try refreshing the page or check back later.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
