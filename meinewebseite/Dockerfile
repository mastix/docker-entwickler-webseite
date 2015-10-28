#
# Unsere Webseiten Dockerfile, welche die eigentliche (dem Benutzer sichtbare) Webseite zur Verfügung stellt.
#
# Dieser Container beinhaltet reinen HTML-Quellcode (inkl. CSS und JS), welches mit einem nginx zur Verfügung gestellt wird.
#
# Eingesetzte Technologien:
#
# * nginx als HTTP-Server
# * HTML5
# * JavaScript
# * CSS 3
# * Web Components (Polymer - http://polymer-project.org)
#

# Wir nutzen unser Ubuntu Base Image, welches schon die Standardpakete zur Verfügung stellt.
FROM docker_ubuntubase

ENV DEBIAN_FRONTEND noninteractive

# Wir installieren nginx.
RUN \
  add-apt-repository -y ppa:nginx/stable && \
  apt-get update && \
  apt-get install -y nginx && \
  rm -rf /var/lib/apt/lists/* && \
  chown -R www-data:www-data /var/lib/nginx && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
  apt-get autoremove -y

# Da wir den nginx nur starten, arbeiten wir in diesem work directory.
WORKDIR /etc/nginx

# Wir kopieren noch unsere eigenen Konfigurationsdateien in das Image...
COPY config/default.conf /etc/nginx/conf.d/default.conf
COPY config/nginx.conf /etc/nginx/nginx.conf

# ... und starten nginx.
CMD nginx