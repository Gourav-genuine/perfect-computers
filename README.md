# Perfect Computers - E-commerce Platform

A full-stack e-commerce website for tech products with real-time visitor logging and UPI payment integration.

## 🚀 Features

### Frontend (React)

- **Modern E-commerce UI** - Clean, responsive design with gradient themes
- **Product Catalog** - 12 tech products including VR headsets, drones, computers
- **Shopping Cart** - Add/remove items, quantity management
- **Product Modals** - Detailed product views with specifications
- **UPI Payment Integration** - Seamless payment with UPI deeplinks
- **Indian Localization** - Prices in ₹ (INR), 18% GST, PIN codes

### Backend (Node.js + Express)

- **Visitor Logging** - Real-time IP address and activity tracking
- **Order Management** - Complete order logging with customer details
- **Daily Log Files** - Automated daily visitor and order logs
- **RESTful API** - Comprehensive API endpoints
- **CORS Enabled** - Cross-origin requests support

## 🛍️ Product Catalog

### VR Headsets

- Meta Quest 3 (128GB) - ₹15,999 (78% off)
- Apple Vision Pro - ₹99,999 (69% off)
- PICO 4 VR Headset - ₹12,999 (75% off)

### Drones

- DJI Air 3 - ₹34,999 (72% off)
- DJI Mini 4 Pro - ₹22,999 (74% off)
- DJI Mavic 3 Pro - ₹49,999 (71% off)

### Computers & More

- Gaming Desktop, MacBook Pro, Audio devices, Tablets, Accessories

## 🏗️ Project Structure

```
perfect/
├── perfect-computers/          # React Frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── data/             # Product data
│   │   └── services/         # API services
│   └── public/               # Static assets
│
├── perfect-computers-backend/  # Node.js Backend
│   ├── server.js            # Main server file
│   ├── logs/                # Daily log files
│   └── package.json         # Dependencies
│
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/perfect-computers.git
   cd perfect-computers
   ```

2. **Setup Frontend**

   ```bash
   cd perfect-computers
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd ../perfect-computers-backend
   npm install
   ```

### Running the Application

1. **Start Backend Server**

   ```bash
   cd perfect-computers-backend
   PORT=5001 node server.js
   ```

   Server will run on `http://localhost:5001`

2. **Start Frontend** (in new terminal)
   ```bash
   cd perfect-computers
   npm start
   ```
   App will open at `http://localhost:3000`

## 📊 API Endpoints

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | `/api/health`        | Health check           |
| POST   | `/api/log-visitor`   | Log visitor activity   |
| POST   | `/api/log-order`     | Log completed orders   |
| GET    | `/api/visitor-stats` | Get visitor statistics |
| GET    | `/api/logs/today`    | Get today's logs       |

## 💳 Payment Integration

- **UPI Payment**: Integrated with UPI deeplinks
- **UPI ID**: `7999094448@ybl`
- **Auto-redirect**: Automatic UPI app opening
- **Payment confirmation**: Step-by-step payment flow

## 📋 Logging Features

### Visitor Logs (`logs/visitors-YYYY-MM-DD.log`)

```
[2025-06-24T15:20:05.881Z] IP: 192.168.1.100 | User-Agent: Mozilla/5.0... | Endpoint: home - page_view
```

### Order Logs (`logs/orders-YYYY-MM-DD.log`)

```
[2025-06-24T15:30:15.123Z] ORDER - IP: 192.168.1.100 | Total: ₹45999 | Items: 2 | Customer: John Doe
```

## 🛠️ Tech Stack

### Frontend

- **React** 18
- **CSS3** with Flexbox/Grid
- **Fetch API** for HTTP requests
- **Responsive Design**

### Backend

- **Node.js** with Express
- **CORS** enabled
- **File System** logging
- **IP Detection** middleware

## 🔧 Configuration

### Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5001)
- `PORT` - Backend server port (default: 5000)

### Frontend API Configuration

```javascript
// src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";
```

## 📈 Features in Detail

### Real-time Visitor Tracking

- IP address logging
- User agent detection
- Page visit tracking
- Action logging (add to cart, checkout, etc.)
- Daily statistics

### E-commerce Functionality

- Product browsing with filters
- Shopping cart management
- Quantity selection
- Order summary
- Customer information collection
- Payment processing

### Indian Market Focus

- Prices in Indian Rupees (₹)
- Massive discounts (69-78% off)
- 18% GST calculation
- PIN code in checkout form
- UPI payment integration

## 🚀 Deployment

### Frontend Deployment

```bash
cd perfect-computers
npm run build
# Deploy build/ folder to your hosting service
```

### Backend Deployment

```bash
cd perfect-computers-backend
# Deploy to your Node.js hosting service
# Set PORT environment variable
```

## 📞 Support

For support and questions:

- Check the logs in `perfect-computers-backend/logs/`
- Ensure both frontend and backend are running
- Verify API endpoints are accessible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Perfect Computers** - Your one-stop shop for amazing tech deals! 🛒✨
