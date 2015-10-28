#!/bin/bash

# Jedes Mal, wenn wir per SCP Dateien auf den Server laden, verändern sich die Permissions, weshalb wir diese immer exklusiv setzen müssen.
sudo chown -R johndoe:docker *
sudo chmod -R 775 *
sudo chmod -R 777 mongodbdatabase/db

# Um sicherzustellen, dass wir die aktuellen Konfigurationsdateien anziehen bauen wir die Container neu und starten den Docker Compose Daemon.
docker-compose build && docker-compose up -d
