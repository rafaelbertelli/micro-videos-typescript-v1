#!/bin/bash

if [ ! -f "./src/@core/.env" ]; then
  cp src/@core/.env.example src/@core/.env
fi

npm install

npm run start:dev

# tail -f /dev/null
