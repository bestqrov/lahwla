#!/bin/sh

# Run database migrations
echo "Running database migrations..."
npx prisma db push --accept-data-loss || echo "Database migration failed, continuing..."

# Start backend in background on port 3001
echo "Starting backend..."
PORT=3001 npm start &

# Start frontend on port 3000 using standalone server
echo "Starting frontend..."
cd frontend && PORT=3000 node .next/standalone/server.js