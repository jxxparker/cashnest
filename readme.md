# CashnestQA - Personal Finance Tracker

A full-stack personal finance application for tracking expenses, assets, debts, and stock holdings with a clean, modern interface.

![CashnestQA](https://img.shields.io/badge/License-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)

## ✨ Features

- 🔐 **User Authentication** - Secure registration and login with JWT
- 💰 **Net Worth Tracking** - Track assets, debts, and stock holdings
- 📊 **Expense Management** - Categorized expense tracking with monthly views
- 📈 **Real-time Stock Prices** - Integration with financial APIs
- 🌙 **Dark/Light Theme** - Toggle between themes for better user experience
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT tokens
- **APIs**: Alpha Vantage for stock prices

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or connection string)
- npm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jxxparker/cashnest.git
   cd cashnest
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp server/.env.example server/.env
   # Edit server/.env with your configuration
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Ubuntu/Debian
   sudo systemctl start mongodb
   ```

5. **Run the application**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

## 📁 Project Structure

```
cashnest/
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
│   └── .env.example       # Environment template
├── docker-compose.yml     # Docker configuration
└── package.json           # Root package configuration
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Run both frontend and backend in development mode
- `npm run server:dev` - Run backend with auto-restart
- `npm run server:start` - Run backend in production mode
- `npm run client:dev` - Serve frontend with live server
- `npm run install:all` - Install dependencies for both frontend and backend

### Environment Configuration

Create a `server/.env` file with the following variables:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/cashnestqa
JWT_SECRET=your_secure_jwt_secret_here
ALPHA_VANTAGE_KEY=your_alpha_vantage_api_key
NODE_ENV=development
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

#### Net Worth
- `GET /api/assets` - Get user assets
- `POST /api/assets` - Add new asset
- `DELETE /api/assets/:id` - Delete asset
- `GET /api/debts` - Get user debts
- `POST /api/debts` - Add new debt
- `DELETE /api/debts/:id` - Delete debt
- `GET /api/stocks` - Get user stocks
- `POST /api/stocks` - Add new stock
- `DELETE /api/stocks/:id` - Delete stock

#### Expenses
- `GET /api/expenses` - Get user expenses
- `POST /api/expenses` - Add new expense
- `DELETE /api/expenses/:id` - Delete expense

## 🐳 Docker Deployment

For production deployment using Docker:

```bash
docker-compose up -d
```

This will run:
- Frontend on port 8080
- Backend on port 4000

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Environment variable protection

## 📱 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Net Worth**: Add assets, debts, and stock holdings to track your net worth
3. **Expenses**: Record and categorize your expenses with monthly filtering
4. **Theme**: Toggle between light and dark themes using the theme button

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Alpha Vantage for stock price API
- MongoDB for database solution
- Express.js for the backend framework

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

Made with ❤️ by [jxxparker](https://github.com/jxxparker)
