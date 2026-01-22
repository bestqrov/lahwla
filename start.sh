#!/bin/sh

# Run database migrations
echo "Running database migrations..."
npx prisma db push --accept-data-loss || echo "Database migration failed, continuing..."

# Start backend in background
echo "Starting backend..."
npm start &

# Start frontend
echo "Starting frontend..."
cd frontend && npm start