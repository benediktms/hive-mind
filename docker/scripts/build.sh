#!/usr/bin/env bash

set -eo pipefail

mkdir -p generated
docker-compose \
  -f templates/deploy-base.yml \
  -f templates/backend.yml \
  -f templates/frontend.yml \
  --env-file .env \
  config >generated/build.yml

docker-compose -f generated/build.yml pull
docker-compose -f generated/build.yml up -d
