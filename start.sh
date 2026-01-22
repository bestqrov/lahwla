#!/bin/sh

# Run database migrations
echo "Running database migrations..."
npx prisma db push --accept-data-loss || echo "Database migration failed, continuing..."

# Start the server (serves both backend API and frontend)
echo "Starting server..."
npm start