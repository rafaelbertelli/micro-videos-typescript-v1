#!/bin/bash

if [ ! -f "./src/@core/.env" ]; then
  cp src/@core/.env.example src/@core/.env
fi

if [ ! -f "./src/nestjs/src/envs/.env" ]; then
  cp src/nestjs/src/envs/.env.example src/nestjs/src/envs/.env
fi

npm install
npm run start:dev

# tail -f /dev/null
