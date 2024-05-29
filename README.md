# Chain Explorer

Chain Explorer is a web application that allows users to view detailed information about Ethereum and Polygon transactions and addresses. This project is built using Next.js and leverages various technologies to provide a seamless experience.

## Live

- [chain-explorer-psi.vercel.app](https://chain-explorer-psi.vercel.app/ethereum/address/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045)

<img width="800"  src="https://github.com/tukwan/chain-explorer/assets/7630720/4369a608-e19e-49ca-8cc2-43c929a63716">

## Features

- **Address Details**: View transactions and balance details for a specific Ethereum or Polygon address.
- **Transaction Details**: View detailed information about a specific Ethereum or Polygon transaction, including its status, amount, and associated addresses.
- **Dynamic Routing**: Pages are dynamically generated based on the address or transaction hash provided in the URL.
- **Data Fetching**: Uses APIs from Infura, Etherscan, and Polygonscan to fetch blockchain data.
- **Incremental Static Regeneration (ISR)**: Ensures that pages are updated at regular intervals without needing to rebuild the entire site.
- **Responsive Design**: Optimized for both desktop and mobile viewing.

## Tech Stack

- **Next.js**: Framework for React applications with built-in support for server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Shadcn**: Provides high-quality and customizable UI components.
- **Ethers.js**: Library for interacting with the Ethereum blockchain.
- **Infura**: Provides access to Ethereum and IPFS networks.
- **@tanstack/react-table**: Powerful table library for building data grids.
- **ethereum-blockies-base64**: Library for generating identicons for Ethereum addresses.
- **React-hot-toast**: Library for displaying notifications.

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/tukwan/chain-explorer.git
   cd chain-explorer
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Run the development server**:

   ```sh
   npm run dev
   ```

4. **Build for production**:
   ```sh
   npm run build
   npm start
   ```

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

## Environment Variables

Make sure to set up the following environment variables in a `.env.local` file:

```sh
NEXT_PUBLIC_INFURA_PROJECT_ID=your_infura_project_id
NEXT_PUBLIC_ETHERSCAN_API_KEY=your_etherscan_api_key
NEXT_PUBLIC_POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.
