#!/bin/bash

# Perfect Computers Frontend - Netlify Deployment Script

echo "🚀 Deploying Perfect Computers to Netlify..."
echo "==========================================="

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Navigate to frontend directory
cd perfect-computers

echo "🔧 Building production version..."
npm run build

echo "🌐 Deploying to Netlify..."
echo "Choose one of the following options:"
echo ""
echo "1️⃣ Quick Deploy (drag and drop):"
echo "   - Go to https://app.netlify.com/drop"
echo "   - Drag the 'build' folder to deploy instantly"
echo ""
echo "2️⃣ CLI Deploy:"
netlify deploy --prod --dir=build

echo ""
echo "✅ Deployment completed!"
echo "🔗 Your Perfect Computers frontend is now live!"
echo ""
echo "📊 Features:"
echo "   - React e-commerce app with shopping cart"
echo "   - UPI payment integration"
echo "   - Real-time visitor logging to https://data.jyanganj.com"
echo "   - 12 tech products with massive discounts" 