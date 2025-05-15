#!/bin/bash

set -e
cd /home/dclinica/public_html/ || true

echo '# Stop project'
pm2 stop ecosystem.config.js

echo "# Installing dependencies"
npm install

echo "# Running build"
npm run build

echo "# Running server PM2"
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
