FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

ENV TZ=UTC

EXPOSE 3000
