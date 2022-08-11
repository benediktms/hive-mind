#!/usr/bin/env bash

mkdir -p generated

docker network create net

docker-compose \
  --env-file .env \
  -f templates/api.yml \
  -f templates/web.yml \
  -f templates/nginx.yml \
  -f templates/lets-encrypt.yml \
  config \
  >generated/deploy-prod.yml

docker-compose -f generated/deploy-prod.yml pull
