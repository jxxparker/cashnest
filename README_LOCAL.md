# CashnestQA - Personal Finance Tracker

A full-stack personal finance application for tracking expenses, assets, debts, and stock holdings.

## Features

- **Authentication**: User registration and login
- **Net Worth Tracking**: Track assets, debts, and stock holdings
- **Expense Management**: Categorized expense tracking with monthly views
- **Dark/Light Theme**: Toggle between themes
- **Real-time Stock Prices**: Integration with financial APIs

## Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT tokens

## Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- MongoDB (running locally or connection string)
- npm package manager

## Local Development Setup

### 1. Install MongoDB

**macOS (using Homebrew):**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Windows:**
Download and install from [MongoDB Official Website](https://www.mongodb.com/try/download/community)

### 2. Clone and Setup the Project

```bash
# Navigate to project directory
cd /Users/jihunpark/Developer/Javascript/Projects/Cashnest_HQ/CashnestQA

# Install all dependencies (root and server)
npm run install:all
```

### 3. Environment Configuration

The application uses environment variables for configuration. The server `.env` file is already configured for local development:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/cashnestqa
JWT_SECRET=your_jwt_secret_key_here_change_in_production
ALPHA_VANTAGE_KEY=WNYLWGJ3ZN9HJM3G
NODE_ENV=development
```

**Important**: Change the `JWT_SECRET` to a secure random string in production.

### 4. Running the Application

#### Development Mode (Recommended)
```bash
# Run both frontend and backend concurrently
npm run dev
```

This will start:
- Backend server at `http://localhost:4000`
- Frontend client at `http://localhost:3000`

#### Alternative: Run Separately

**Backend only:**
```bash
npm run server:dev
```

**Frontend only:**
```bash
npm run client:dev
```

### 5. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000

## API Configuration

The application automatically detects the environment:
- **Local Development**: Uses `http://localhost:4000/api`
- **Production**: Uses `http://3.229.166.20:4000/api`

Configuration is handled in `client/config.js`.

## Project Structure

```
CashnestQA/
├── client/                 # Frontend application
│   ├── index.html         # Main HTML file
│   ├── style.css          # Styling
│   ├── config.js          # API configuration
│   ├── auth/              # Authentication components
│   ├── expenses/          # Expense tracking
│   ├── networth/          # Net worth components
│   └── img/               # Images and assets
├── server/                # Backend application
│   ├── index.js           # Server entry point
│   ├── features/          # Feature-based modules
│   │   ├── auth/          # Authentication
│   │   ├── expenses/      # Expense management
│   │   └── networth/      # Assets, debts, stocks
│   └── .env               # Environment variables
├── docker-compose.yml     # Docker configuration
└── package.json           # Root package configuration
```

## Database

The application creates a MongoDB database named `cashnestqa` with the following collections:
- `users` - User accounts
- `assets` - User assets
- `debts` - User debts  
- `expenses` - User expenses
- `stocks` - User stock holdings

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Net Worth**: Add assets, debts, and stock holdings to track your net worth
3. **Expenses**: Record and categorize your expenses with monthly filtering
4. **Theme**: Toggle between light and dark themes using the theme button

## Docker Deployment

For production deployment using Docker:

```bash
docker-compose up -d
```

This will run:
- Frontend on port 8080
- Backend on port 4000

## Development Scripts

- `npm run dev` - Run both frontend and backend in development mode
- `npm run server:dev` - Run backend with nodemon (auto-restart)
- `npm run server:start` - Run backend in production mode
- `npm run client:dev` - Serve frontend with live server
- `npm run install:all` - Install dependencies for both frontend and backend

## Troubleshooting

**MongoDB Connection Issues:**
- Ensure MongoDB is running: `brew services list | grep mongodb` (macOS)
- Check connection string in server/.env
- Verify database permissions

**Port Conflicts:**
- Backend runs on port 4000
- Frontend runs on port 3000
- Check if ports are available: `lsof -i :4000` and `lsof -i :3000`

**API Connection Issues:**
- Verify backend is running and accessible
- Check browser network tab for API call errors
- Ensure CORS is properly configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and personal use.
