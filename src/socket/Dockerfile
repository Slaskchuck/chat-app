FROM node:12-alpine

RUN mkdir -p /src && npm install -g pm2

WORKDIR /src

COPY package.json .

RUN yarn

CMD ["pm2-runtime", "/src/pm2.json"]