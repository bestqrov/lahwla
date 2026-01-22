#!/bin/sh

# Start backend in background
npm start &

# Start frontend
cd frontend && npm start