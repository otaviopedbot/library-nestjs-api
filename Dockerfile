FROM node:18.17.1

COPY . .

COPY package*.json ./

WORKDIR /usr/app

EXPOSE 3000

COPY ./docker-entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]
