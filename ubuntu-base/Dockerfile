#
# Ubuntu Dockerfile, um das Base Image für die darauf folgenden Schichten bereitzustellen (Zwiebel-Prinzip).
#

# Das offizielle Ubuntu 15.04 Wily aus dem Docker Hub (https://hub.docker.com/_/ubuntu).
FROM ubuntu:15.04

ENV DEBIAN_FRONTEND noninteractive

# Installation der benötigten Pakete.
RUN \
  sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list && \
  apt-get update && \
  apt-get -y upgrade && \
  apt-get install -y build-essential && \
  apt-get install -y software-properties-common && \
  apt-get install -y byobu curl git htop man unzip vim wget openssl && \
  rm -rf /var/lib/apt/lists/*

# Setzen der HOME Umgebungsvariable.
ENV HOME /root

# Unser Arbeitsverzeichnis.
WORKDIR /root

# Bash soll automatisch gestartet werden.
CMD ["bash"]