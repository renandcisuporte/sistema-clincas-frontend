FROM node:16-alpine as development
WORKDIR /app
COPY --chown=node:node package*.json .
RUN npm ci
COPY --chown=node:node . .

FROM node:16-alpine as build
WORKDIR /app
COPY --chown=node:node --from=development /app /app
RUN npm run build

FROM node:16-alpine as production
WORKDIR /app
COPY --chown=node:node package*.json .
RUN npm ci
COPY --chown=node:node --from=build ./app/build ./app/build
COPY --chown=node:node --from=build ./app/public ./app/public
COPY --chown=node:node --from=build ./app/prisma ./app/prisma
CMD [ "npm", "run", "start" ]





