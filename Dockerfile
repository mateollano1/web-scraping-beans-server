FROM node:12.16.3-buster-slim

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=80

EXPOSE 80

CMD [ "node", "index.js"]