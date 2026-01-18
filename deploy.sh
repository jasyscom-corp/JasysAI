#!/bin/bash

# JasyAI Auto Deployment Script
# Automatically creates KV namespaces and deploys the worker

echo "🚀 JasyAI Auto Deployment"
echo "========================="

# Check if wrangler is logged in
if ! wrangler whoami &> /dev/null; then
    echo "🔐 Please login to Cloudflare first:"
    wrangler auth login
fi

# Create KV namespace for production
echo "📦 Creating KV namespace..."
KV_ID=$(wrangler kv:namespace create "JASYSAI_KV" --preview false | grep -o '"[^"]*"' | tail -1 | tr -d '"')

if [ -z "$KV_ID" ]; then
    echo "❌ Failed to create KV namespace"
    exit 1
fi

echo "✅ KV Namespace created with ID: $KV_ID"

# Update wrangler.toml with the KV ID
sed -i "s/id = \"jasysai-kv\"/id = \"$KV_ID\"/" wrangler.toml

echo "📝 Updated wrangler.toml with KV binding"

# Deploy the worker
echo "🚀 Deploying worker..."
wrangler deploy

if [ $? -eq 0 ]; then
    echo "🎉 Deployment successful!"
    echo "🌐 Your app is now live at: https://ai.jasyscom.workers.dev"
else
    echo "❌ Deployment failed"
    exit 1
fi