

# GrpOrg

## Setup
To set this workspace up you will need to create an `.env` and an `.env.test` file.

For the `.env. test` file, add:
- NODE_ENV=test
- DATABASE_URL=postgresql://prisma:prisma@localhost:5433/tests

And for the `.env` file you can get started with:
- NODE_ENV=development
- DATABASE_URL=postgresql://postgres:postgres@localhost:5432/grp
- POSTGRES_PASSWORD=postgres
- POSTGRES_USER=postgres
- JWT_SECRET=GRP_ORG_SECRET

If there are any configurations missing the nest server should complain.

You will also need docker and docker compose installed.
