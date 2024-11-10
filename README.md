# GamePulse

**GamePulse** is a Web3 analytics dashboard designed to track in-game purchases, transactions, and user engagement across blockchain-based games. It provides players, developers, and analysts with valuable insights into the financial activity and patterns of game users, including in-game subscriptions, transactions, and sybil risk assessments.

## Features

- **Real-time transaction tracking**: Monitor the latest on-chain transactions from blockchain games using BSC (Binance Smart Chain).
- **In-game purchase & subscription monitoring**: Keep track of user purchases and subscriptions for games.
- **Sybil risk scoring**: Calculate and visualize the Sybil risk for game participants based on their transaction behavior.
- **User engagement tracking**: Visualize wallet creation dates, transaction histories, and the latest in-game activities.
- **Dynamic round-based filtering**: Filter and view contributions per game round (e.g., Game1, Game2).

## How **GamePulse** Detects Sybil Attacks and Calculates Activity Ratings

**GamePulse** uses a combination of transaction behavior analysis and machine learning-based Sybil risk scoring to evaluate the reliability of users and detect Sybil attacks in blockchain-based games. Below is a detailed explanation of how these systems work:

### 1. **Tracking Transaction History**
GamePulse monitors blockchain transactions in real-time via the **BSCScan API**. This data includes:

- **Wallet addresses**: The unique identifiers for users.
- **Transaction hashes**: Identifiers for each transaction.
- **Input data**: Specific methods called during the transaction (e.g., `subscribe`, `addSubscribersInBulk`).
- **Timestamps**: When the transaction occurred.

Each transaction is recorded and classified based on the function it performs (e.g., in-game purchase, subscription, or other smart contract interactions).

### 2. **Sybil Risk Scoring**

Sybil attacks occur when a single entity creates many fake identities (wallet addresses) in an attempt to manipulate voting, airdrop claims, or other game-related activities. **GamePulse** detects Sybil attacks by scoring wallet addresses based on the following factors:

- **Address Similarity**: GamePulse checks if multiple wallet addresses are interacting with the same smart contracts or performing similar actions within a short time frame. Sybil attackers often use many addresses to interact with smart contracts, especially in bulk, such as when claiming rewards or subscribing in-game.
  
- **Transaction Behavior Analysis**: If multiple wallet addresses share similar transaction patterns, such as a high number of low-value transactions, or transactions involving specific tokens in a certain pattern, GamePulse flags them as potentially suspicious.

- **Frequency of Transactions**: Sybil attackers often create many low-value, high-frequency transactions to mimic normal user behavior. GamePulse identifies abnormal transaction frequencies and flags wallets that may be engaged in Sybil activities.

- **Behavioral Clusters**: GamePulse uses machine learning clustering techniques (e.g., K-means or DBSCAN) to identify clusters of addresses with similar behaviors. If multiple addresses are found to be "clustered" together due to similar transactions, gas fees, or contract interactions, they may be flagged as suspicious.

- **Risk Score Calculation**: Based on the analysis, each wallet address is assigned a Sybil risk score, which indicates the likelihood of the address being part of a Sybil attack. The risk score is calculated using a weighted scoring system based on:
  - **Transaction Volume**: High transaction volume with few unique addresses can be a sign of Sybil behavior.
  - **Transaction Variety**: A higher variety of contract calls and token interactions reduces the risk score.
  - **Recent Activity**: Newer accounts with minimal history or significant recent activity are flagged as higher risk.

   **Risk Score Levels**:
   - **Low Risk**: Few transactions, minimal cluster behavior, diverse interactions.
   - **Medium Risk**: Moderate transaction frequency, limited cluster behavior, occasional similar patterns.
   - **High Risk**: Multiple transactions with high frequency, repetitive patterns, and similar transaction signatures across multiple addresses.

### 3. **Activity Ratings**

**Activity ratings** are used to assess the engagement and legitimacy of users in the game ecosystem. These ratings are based on:

- **Transaction Volume**: Higher transaction volume and more consistent participation indicate more legitimate user behavior.
  
- **Transaction Recency**: More recent transactions contribute positively to the activity score, as it demonstrates the user's ongoing engagement with the game.

- **Game Subscription Patterns**: Players who subscribe regularly or make in-game purchases are rated higher. GamePulse tracks these activities and provides an engagement score based on their historical behavior.
  
- **Wallet Reputation**: Wallets that have participated in multiple game rounds or interacted with reputable dApps are considered more trustworthy. Wallets with fewer interactions or those involved in suspicious activities are rated lower.

The **activity rating** is calculated by aggregating these individual factors and assigning a score to the user. The score ranges from 0 (inactive or suspicious) to 100 (highly active and legitimate).

### 4. **Detecting Sybil Attacks in Real-Time**
GamePulse continuously monitors the blockchain for patterns that could indicate Sybil attacks, such as:

- **Abnormal transaction spikes**: A sudden increase in transactions involving the same set of addresses or tokens.
- **Bulk interactions**: A large number of addresses subscribing or interacting with the same contract in a short period, which could be indicative of Sybil behavior.
- **Repetitive transaction signatures**: Multiple transactions with the same input data or method calls that originate from different addresses.

### 5. **Visualizing Risk & Activity**
**GamePulse** provides easy-to-understand visualizations to help users interpret the Sybil risk and activity levels:

- **Risk Score**: Displays the risk associated with each address, helping game developers and analysts identify potential bad actors.
- **Activity Graph**: Shows a timeline of user transactions, providing insight into when and how often a user engages with the game.
- **Heatmaps**: Visualizes clusters of high-risk or highly active users, making it easy to detect abnormal patterns.

## Tech Stack

- **Frontend**: 
  - Next.js
  - Tremor UI (for beautiful and customizable UI components)
  - Tailwind CSS (for styling)
  - Axios (for API requests)
  - Day.js (for date manipulation and formatting)
- **Blockchain**: 
  - Binance Smart Chain (BSC) API
  - Ethereum address utilities (e.g., `truncate-eth-address` for displaying wallet addresses)
  
## Installation

To get started with **GamePulse**, follow these steps:

### Prerequisites

1. Install **Node.js** and **npm** (Node Package Manager) if you haven’t already.

   - [Node.js Downloads](https://nodejs.org/)
   
2. Clone the repository:

   ```bash
   git clone https://github.com/sambitsargam/bnbhack.git
   cd bnbhack
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Running Locally

To start the application locally in development mode:

```bash
npm run dev
```

This will start the development server at `http://localhost:3000`, and you can view the project in your browser.

### Building for Production

To run the app for production and optimize it:

```bash
npm run dev
```

## Usage

After the app is running, you can:

- View **real-time game contributions** from various rounds.
- Monitor **in-game transactions**, including subscriptions and other on-chain purchases.
- Visualize **Sybil risk scores** to assess the reliability of game participants.
- Use the **wallet address** of any player to check their game-related transactions.

## API Integration

**GamePulse** uses the **BSCScan API** to fetch transaction data and monitor in-game purchases and subscriptions. Here's how you can use the API:

## Features Coming Soon

- **Game Analytics**: Deeper insights into transaction patterns, most popular in-game items, etc.
- **Cross-chain support**: Ability to track transactions across different blockchains like Ethereum and Polygon.
- **Wallet integration**: Allow users to connect their wallet for personalized data and analytics.

## License

**GamePulse** is open-source and available under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

- **Twitter**: [@sambitsargam](https://twitter.com/sambitsargam)

## Acknowledgements

- [BSCScan API](https://bscscan.com/apis) – For providing the data used in this project.
- [Tremor UI](https://www.tremor.so) – For the beautiful and easy-to-use UI components.
- [Day.js](https://day.js.org/) – For handling date and time formatting.
- [slaysybil](https://github.com/0x9simon/slaysybil) - For the Sybil risk scoring algorithm.
- [Umar] - For Example UI

