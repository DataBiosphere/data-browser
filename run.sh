#!/bin/sh

echo "BOARDWALK_HOST is: "$BOARDWALK_HOST
pm2-docker server/dist/server.js