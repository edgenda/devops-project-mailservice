#!/bin/bash
set -e

if [ "$1" = 'start' ]; then
  ./wait-for-it.sh ${RABBIT_HOST:-localhost}:${RABBIT_PORT:-5672} -- npm start
fi

exec "$@"