#!/usr/bin/env bash

# Wir installieren alle Abhängigkeiten der package.json und starten die Applikation mittels PM2.
npm install && pm2 start index.js --name meinewebseite-api --log /var/log/pm2/pm2.log --watch --no-daemon