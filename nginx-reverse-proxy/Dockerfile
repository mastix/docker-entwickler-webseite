#
# nginx Reverse Proxy Dockerfile, welches die Verteilung der Requests uebernimmt.
#
# api.meinewebseite.de => leitet alle Requests intern zu unserem REST-API Container weiter (NodeJS 4.x inkl. hapi.JS)
# www.meinewebseite.de => leitet alle Requests intern zu unserem Webseite Container weiter (nginx, HTML5, CSS, JavaScript (Polymer & Web Components))
#

# Wir nutzen unser Ubuntu Base Image, welches schon die Standardpakete zur Verfügung stellt.
FROM docker_ubuntubase

ENV DEBIAN_FRONTEND noninteractive

# Installation von nginx.
RUN \
  add-apt-repository -y ppa:nginx/stable && \
  apt-get update && \
  apt-get install -y nginx && \
  rm -rf /var/lib/apt/lists/* && \
  chown -R www-data:www-data /var/lib/nginx

# Unser Arbeitsverzeichnis, hier werden alle Befehle ausgeführt.
WORKDIR /etc/nginx

# Wir kopieren alle unsere Konfigurations-Dateien in das Image.
COPY config/default.conf /etc/nginx/conf.d/default.conf
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/rename_ips_and_ports.sh /etc/nginx/rename_ips_and_ports.sh
RUN ["chmod", "+x", "/etc/nginx/rename_ips_and_ports.sh"]

# Wir löschen noch die Standard-HTML-Seite von nginx.
RUN rm /var/www/html/index.nginx-debian.html

# Wir führen das Ersetzen der Platzhalter aus und starten nginx.
CMD /etc/nginx/rename_ips_and_ports.sh && nginx