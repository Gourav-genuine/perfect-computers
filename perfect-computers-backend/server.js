const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Function to get client IP address
const getClientIP = (req) => {
  return req.ip || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
         req.headers['x-forwarded-for']?.split(',')[0] ||
         req.headers['x-real-ip'] ||
         'unknown';
};

// Function to log visitor data
const logVisitor = (ip, userAgent, endpoint) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    ip,
    userAgent,
    endpoint,
    date: new Date().toLocaleDateString('en-IN'),
    time: new Date().toLocaleTimeString('en-IN')
  };
  
  const logLine = `[${timestamp}] IP: ${ip} | User-Agent: ${userAgent} | Endpoint: ${endpoint}\n`;
  
  // Log to file
  const logFile = path.join(logsDir, `visitors-${new Date().toISOString().split('T')[0]}.log`);
  fs.appendFileSync(logFile, logLine);
  
  // Also log to console for development
  console.log(`🔍 Visitor logged: ${ip} at ${logEntry.time} on ${logEntry.date}`);
  
  return logEntry;
};

// Middleware to log all requests
app.use((req, res, next) => {
  const ip = getClientIP(req);
  const userAgent = req.headers['user-agent'] || 'unknown';
  logVisitor(ip, userAgent, req.path);
  next();
});

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Perfect Computers Backend Server is running',
    timestamp: new Date().toISOString()
  });
});

// Log visitor endpoint (called from frontend)
app.post('/api/log-visitor', (req, res) => {
  const ip = getClientIP(req);
  const userAgent = req.headers['user-agent'] || 'unknown';
  const { page, action } = req.body;
  
  const logEntry = logVisitor(ip, userAgent, `${page} - ${action}`);
  
  res.json({
    success: true,
    message: 'Visitor logged successfully',
    data: {
      ip: logEntry.ip,
      timestamp: logEntry.timestamp,
      page,
      action
    }
  });
});

// Get visitor stats endpoint
app.get('/api/visitor-stats', (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const logFile = path.join(logsDir, `visitors-${today}.log`);
    
    if (!fs.existsSync(logFile)) {
      return res.json({
        success: true,
        stats: {
          todayVisitors: 0,
          totalLogs: 0,
          lastVisit: null
        }
      });
    }
    
    const logContent = fs.readFileSync(logFile, 'utf8');
    const logLines = logContent.trim().split('\n').filter(line => line.length > 0);
    
    // Extract unique IPs for today
    const uniqueIPs = new Set();
    let lastVisit = null;
    
    logLines.forEach(line => {
      const ipMatch = line.match(/IP: ([^\s|]+)/);
      const timestampMatch = line.match(/\[([^\]]+)\]/);
      
      if (ipMatch) {
        uniqueIPs.add(ipMatch[1]);
      }
      if (timestampMatch) {
        lastVisit = timestampMatch[1];
      }
    });
    
    res.json({
      success: true,
      stats: {
        todayVisitors: uniqueIPs.size,
        totalLogs: logLines.length,
        lastVisit,
        uniqueIPs: Array.from(uniqueIPs)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reading visitor stats',
      error: error.message
    });
  }
});

// Order logging endpoint
app.post('/api/log-order', (req, res) => {
  const ip = getClientIP(req);
  const userAgent = req.headers['user-agent'] || 'unknown';
  const { orderData, total, items } = req.body;
  
  const timestamp = new Date().toISOString();
  const orderLogEntry = {
    timestamp,
    ip,
    userAgent,
    total,
    itemCount: items?.length || 0,
    customerInfo: orderData
  };
  
  // Log order to separate file
  const orderLogFile = path.join(logsDir, `orders-${new Date().toISOString().split('T')[0]}.log`);
  const orderLogLine = `[${timestamp}] ORDER - IP: ${ip} | Total: ₹${total} | Items: ${orderLogEntry.itemCount} | Customer: ${orderData?.firstName} ${orderData?.lastName}\n`;
  
  fs.appendFileSync(orderLogFile, orderLogLine);
  
  console.log(`💰 Order logged: ₹${total} from ${ip} at ${new Date().toLocaleTimeString('en-IN')}`);
  
  res.json({
    success: true,
    message: 'Order logged successfully',
    orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  });
});

// Get today's logs endpoint (for development/admin)
app.get('/api/logs/today', (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const logFile = path.join(logsDir, `visitors-${today}.log`);
    
    if (!fs.existsSync(logFile)) {
      return res.json({
        success: true,
        logs: [],
        message: 'No logs found for today'
      });
    }
    
    const logContent = fs.readFileSync(logFile, 'utf8');
    const logs = logContent.trim().split('\n').filter(line => line.length > 0);
    
    res.json({
      success: true,
      logs: logs.slice(-50), // Return last 50 logs
      total: logs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reading logs',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Perfect Computers Backend Server is running on port ${PORT}`);
  console.log(`📊 Visitor logs will be saved to: ${logsDir}`);
  console.log(`🌐 API endpoints available at: http://localhost:${PORT}/api/`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n📝 Server shutting down gracefully...');
  process.exit(0);
}); 