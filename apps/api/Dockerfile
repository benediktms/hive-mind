FROM node:18-alpine as deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && \
  yarn cache clean

FROM node:16-alpine as build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn prisma:generate
RUN yarn build:api:prod

FROM node:16-alpine as runner
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
ENV NODE_ENV production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist/apps/api ./
RUN yarn install --frozen-lockfile --production && \
  yarn cache clean
RUN yarn prisma:generate
EXPOSE 3001
CMD ["node", "main"]

