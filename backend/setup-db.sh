#!/bin/bash
echo "Setting up database..."
npx prisma migrate deploy
echo "Database setup complete!"