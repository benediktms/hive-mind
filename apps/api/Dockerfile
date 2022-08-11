FROM node:18-alpine as deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && \
  yarn cache clean

FROM node:18-alpine as build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn prisma:generate && \
  yarn build:api:prod

FROM node:18-alpine as runner
RUN apk add --no-cache libc6-compat
RUN npm i --location=global pm2
WORKDIR /app
COPY package.json yarn.lock ./
ENV NODE_ENV production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist/apps/api ./
RUN yarn install --frozen-lockfile --production && \
  yarn cache clean && \
  yarn prisma:generate
EXPOSE 3001
CMD ["pm2-runtime", "node", "--", "main"]
