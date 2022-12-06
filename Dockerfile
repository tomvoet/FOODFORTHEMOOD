FROM node:16.12-alpine3.14

ENV NODE_ENV development

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY . /home/node/app

RUN npm install

ENV NODE_ENV production

RUN npm run build && \
  npm prune --production

WORKDIR /home/node/app/.output

EXPOSE 3000

CMD ["node", "./server/index.mjs"]