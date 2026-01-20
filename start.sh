#!/bin/sh

# Start backend in background
BACKEND_PORT=3001 npm run start:prod &

# Start frontend
cd frontend && NEXT_PUBLIC_API_URL=http://localhost:3001 npm start