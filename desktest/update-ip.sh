#!/bin/bash
while true
do
  CURRENT_IP=$(curl -s https://ifconfig.me)
  curl -X POST http://178.79.189.240:3333/update-ip \
    --data "ip=$CURRENT_IP" \
    --data "secret=choose-a-strong-password"
  echo "IP updated: $CURRENT_IP"
  sleep 300
done
