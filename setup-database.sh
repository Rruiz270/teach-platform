#!/bin/bash
echo "Creating database tables..."
curl -X POST https://teach-platform-production.up.railway.app/create-tables-emergency \
  -H "Content-Type: application/json" \
  -d '{"secretKey": "teach-platform-setup-2025"}'
echo -e "\n\nChecking database status..."
curl https://teach-platform-production.up.railway.app/db-status