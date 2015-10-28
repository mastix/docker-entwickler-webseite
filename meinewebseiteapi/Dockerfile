#
# Unsere REST-API Dockerfile, welche unseren REST-Service zur Verfügung stellt.
#
# Dieser Cotnainer beinhaltet einen REST-Service, der mit NodeJS 4.x (ECMAScript 6), hapi.JS (REST Framework) und Mongoose (mongoDB Connector) umgesetzt ist.
#

# Wir nutzen unser Ubuntu Base Image, welches schon die Standardpakete zur Verfügung stellt.
FROM docker_ubuntubase

ENV DEBIAN_FRONTEND noninteractive

RUN mkdir -p /var/log/pm2 && \
    mkdir -p /var/www/html && \
    chmod -R +x /var/www/html/

# Wir installieren nodeJS.
RUN apt-get update && \
    wget -qO- https://deb.nodesource.com/setup_4.x | bash - && \
    apt-get install -y nodejs python libkrb5-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    apt-get autoremove -y

RUN ln -s /usr/bin/nodejs /usr/local/bin/node

# Unser working directory ist das gemountedte Verzeichnis auf dem Docker Host.
WORKDIR /var/www/html

# Für das NodeJS Prozessmanagement nutzen wir PM2.
RUN npm install -g gulp pm2

# Wir nutzen ein eigenes Script, welches die Abhängigkeiten installiert und PM2 startet.
CMD ["/var/www/html/build_and_run.sh"]
