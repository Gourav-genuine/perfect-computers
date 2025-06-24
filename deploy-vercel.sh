#!/bin/bash

# Perfect Computers Frontend - Vercel Deployment Script

echo "🚀 Deploying Perfect Computers to Vercel..."
echo "=========================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Navigate to frontend directory
cd perfect-computers

echo "🔧 Building production version..."
npm run build

echo "🌐 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment completed!"
echo "🔗 Your Perfect Computers frontend is now live!"
echo ""
echo "📊 Features:"
echo "   - React e-commerce app with shopping cart"
echo "   - UPI payment integration"
echo "   - Real-time visitor logging to https://data.jyanganj.com"
echo "   - 12 tech products with massive discounts"
echo ""
echo "🎯 Next steps:"
echo "   1. Test your live website"
echo "   2. Share the URL with customers"
echo "   3. Monitor backend logs for visitor activity" 