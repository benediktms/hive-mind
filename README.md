
# Hive Mind

[![CI - Check Branch](https://github.com/benediktms/hive-mind/actions/workflows/check-branch.yml/badge.svg?branch=main)](https://github.com/benediktms/hive-mind/actions/workflows/check-branch.yml)

## Setup

To set this workspace up you will need to create an `.env` and an `.env.test`, as well as an `.env.local` file in `apps/api/`.

For the `.env.test` file, add:

- `DATABASE_URL=postgresql://prisma:prisma@localhost:5433/tests`

For the `.env` file you can get started with:

- `JWT_SECRET=GRP_ORG_SECRET`
- `NEXT_PUBLIC_API_URI=http://localhost:3001`

For the `.env.local` file;

- `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/grp`
- `ANON_KEY=secret`
- `SERVICE_KEY=secret`
- `CLIENT_URL=http://localhost:3000`
- `COOKIE_SECRET=GRP_ORG_SECRET`

If there are any configurations missing the nest server should complain.

You will also need docker and docker compose installed.
