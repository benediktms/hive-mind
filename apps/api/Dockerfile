FROM node:18-alpine as deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && \
  yarn cache clean
COPY . .
RUN yarn prisma:generate
RUN yarn build:api:prod

FROM node:18-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV production
COPY --from=deps /app/yarn.lock ./
COPY --from=deps /app/dist/apps/api ./
RUN yarn install --production && \
  yarn cache clean
COPY --from=deps app/node_modules/.prisma /app/node_modules
EXPOSE 3001
CMD ["node", "main"]

