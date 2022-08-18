# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn prisma:generate
RUN yarn build:web:prod

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app
ARG BACKEND_URL=https://api.hive-mind.app
ENV BACKEND_URL=${BACKEND_URL}
ENV NODE_ENV production
COPY --from=deps /app/dist/apps/web ./
COPY --from=deps /app/yarn.lock ./
RUN yarn install && yarn cache clean
EXPOSE 3000
CMD [ "npm", "run", "start"]
