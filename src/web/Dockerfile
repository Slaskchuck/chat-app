FROM node:12-alpine

RUN mkdir -p /src

WORKDIR /src

ENV PATH /src/node_modules/.bin:$PATH

COPY package.json .
COPY yarn.lock .

RUN yarn

CMD ["yarn", "start"]