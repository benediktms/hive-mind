# Hive Mind

[![CI - Check Branch](https://github.com/benediktms/hive-mind/actions/workflows/check-branch.yml/badge.svg?branch=main)](https://github.com/benediktms/hive-mind/actions/workflows/check-branch.yml)

## Setup

To set this workspace up you will need to create an `.env` and an `.env.test`, as well as an `.env.local` file in `apps/api/`.

For the `.env.test` file, add:

- `DATABASE_URL=postgresql://prisma:prisma@localhost:5433/tests`

For the `.env` file you can get started with the contents of the `.env.sample` file.

If there are any configurations missing the nest server should complain.

You will also need docker and docker compose installed.

Install dependencies with `yarn`

Install the `dotenv-cli` globally. This is needed in order to switch `.env` files correctly for tests. Otherwise prisma will run integration tests against the same database.

Ensure tests pass with `yarn test`.
