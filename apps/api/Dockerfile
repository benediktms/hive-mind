FROM node:18-alpine as build
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && \
  yarn cache clean
COPY . .
RUN yarn prisma:generate && \
  yarn build:api:prod

FROM node:18-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
ENV NODE_ENV production
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist/apps/api ./
RUN yarn install --production && \
  yarn cache clean && \
  yarn prisma:generate
EXPOSE 3001
CMD ["node", "main"]

