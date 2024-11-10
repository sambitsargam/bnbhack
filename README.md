# GamePulse

**GamePulse** is a Web3 analytics dashboard designed to track in-game purchases, transactions, and user engagement across blockchain-based games. It provides players, developers, and analysts with valuable insights into the financial activity and patterns of game users, including in-game subscriptions, transactions, and sybil risk assessments.

## Features

- **Real-time transaction tracking**: Monitor the latest on-chain transactions from blockchain games using BSC (Binance Smart Chain).
- **In-game purchase & subscription monitoring**: Keep track of user purchases and subscriptions for games.
- **Sybil risk scoring**: Calculate and visualize the Sybil risk for game participants based on their transaction behavior.
- **User engagement tracking**: Visualize wallet creation dates, transaction histories, and the latest in-game activities.
- **Dynamic round-based filtering**: Filter and view contributions per game round (e.g., Game1, Game2).

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
   cd GamePulse
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

**GamePulse** uses the **BSCScan API** to fetch transaction data and monitor in-game purchases and subscriptions. Here's how you can use the API

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

