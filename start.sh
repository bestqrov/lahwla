#!/bin/sh

# Start backend in background
npm run start:prod &

# Start frontend
cd frontend && PORT=3000 NEXT_PUBLIC_API_URL=http://localhost:3001 npm start