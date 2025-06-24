# Perfect Computers Backend Server

A Node.js Express server that handles visitor logging and order tracking for the Perfect Computers e-commerce website.

## Features

- **Visitor IP Logging**: Automatically logs visitor IP addresses with timestamps
- **Order Tracking**: Logs completed orders with customer information
- **Daily Log Files**: Organizes logs by date for easy management
- **CORS Support**: Allows frontend communication from different origins
- **Real-time Console Logging**: Shows visitor activity in real-time
- **Statistics API**: Provides visitor statistics and analytics

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Health Check

- **GET** `/api/health`
- Returns server status

### Visitor Logging

- **POST** `/api/log-visitor`
- Body: `{ "page": "string", "action": "string" }`
- Logs visitor activity with IP address and timestamp

### Order Logging

- **POST** `/api/log-order`
- Body: `{ "orderData": {}, "total": number, "items": [] }`
- Logs completed orders with customer details

### Visitor Statistics

- **GET** `/api/visitor-stats`
- Returns today's visitor statistics

### Today's Logs

- **GET** `/api/logs/today`
- Returns recent log entries (last 50)

## Log Files

Logs are automatically created in the `logs/` directory:

- `visitors-YYYY-MM-DD.log` - Daily visitor activity logs
- `orders-YYYY-MM-DD.log` - Daily order completion logs

### Log Format

**Visitor Logs:**

```
[2024-06-24T10:30:00.000Z] IP: 192.168.1.100 | User-Agent: Mozilla/5.0... | Endpoint: Homepage - initial_visit
```

**Order Logs:**

```
[2024-06-24T10:30:00.000Z] ORDER - IP: 192.168.1.100 | Total: ₹25999 | Items: 2 | Customer: John Doe
```

## Environment Variables

- `PORT` - Server port (default: 5000)

## Frontend Integration

The frontend should be configured to connect to this backend:

1. **Update frontend API URL** (if needed):

   ```javascript
   const API_BASE_URL = "http://localhost:5000";
   ```

2. **Start both servers**:
   - Backend: `npm start` (in this directory)
   - Frontend: `npm start` (in perfect-computers directory)

## Development

For development, you can run the server with:

```bash
npm run dev
```

## Security Features

- **IP Address Detection**: Multiple methods to accurately detect client IP
- **CORS Protection**: Configured for frontend domain
- **Error Handling**: Graceful error handling for all endpoints
- **File System Security**: Automatic directory creation and safe file operations

## Monitoring

The server provides real-time console output showing:

- 🔍 Visitor activity with IP addresses and timestamps
- 💰 Order completions with totals and customer info
- 📊 Server status and log file locations

## Troubleshooting

1. **Port already in use**: Change the PORT environment variable
2. **CORS errors**: Ensure the frontend URL is allowed in CORS configuration
3. **Log file permissions**: Ensure the server has write permissions to the logs directory

## License

This project is part of the Perfect Computers e-commerce platform.
