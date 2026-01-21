#!/bin/sh

# Start backend in background
BACKEND_PORT=3001 npm run start:prod &

# Start frontend
cd frontend && npm start