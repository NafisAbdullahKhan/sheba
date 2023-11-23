#!/bin/sh
if test "$NODE_ENV" = "test"
then
yarn test
else
yarn start:${NODE_ENV}
fi