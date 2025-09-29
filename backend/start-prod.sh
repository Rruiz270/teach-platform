#!/bin/bash
echo "Starting TEACH Platform Backend..."
echo "Running database migrations..."
npx prisma migrate deploy
if [ $? -eq 0 ]; then
    echo "Migrations completed successfully!"
else
    echo "Migration failed!"
    exit 1
fi

echo "Starting server..."
node start.js