#!/bin/bash

# Start the first process
pm2 start "npm run dev" --name "site-dev" --max-memory-restart 128 -i 1
pm2 start npm -- run dev --name "teste"
