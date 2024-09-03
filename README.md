# BidLink

BidLink is a Next.js-based web application for hosting and participating in online auctions. It provides a platform for users to create auction listings, place bids, and manage their auction activities.

## Features

- User authentication
- Create and manage auction listings
- Real-time bidding
- Responsive design for desktop and mobile devices
- Image upload for auction items

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Query
- Axios
- NextAuth.js
- Supabase
- AWS S3 (for image storage)

## Getting Started

### Prerequisites

- Node.js (version 16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/BidLink.git
   cd BidLink
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the necessary environment variables (refer to `.env.example` if provided).

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the main application code
  - `(dashboard)/`: Dashboard-related components and pages
  - `auction-card/`: Auction card components
  - `components/`: Reusable UI components
- `public/`: Static assets
- `styles/`: Global styles

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
