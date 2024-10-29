# Next.js Paytech Payment Integration

This project is a Next.js application that integrates with Paytech for processing payments. It includes a sample product page where users can select a quantity and proceed with a payment.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm or yarn package manager

### Clone the Repository

```bash
git clone https://github.com/mariamnour/paytech_test_nextjs.git
cd your-repo
npm install
# or
yarn install

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## Environment Variables

This project requires certain environment variables to connect to Paytech’s API. Create a .env.local file in the root directory and add your Paytech API keys:

### .env.local
PAYTECH_API_KEY=your_paytech_api_key
PAYTECH_API_SECRET=your_paytech_api_secret

Open http://localhost:3000/test-payment with your browser to see the application in your browser to see the result.

