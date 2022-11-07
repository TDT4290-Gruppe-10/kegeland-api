FROM node:14.17.1

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile

COPY . .

RUN yarn build

CMD [ "node", "dist/main.js" ]