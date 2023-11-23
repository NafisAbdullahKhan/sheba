#target: base
FROM node:alpine as base
WORKDIR /app
COPY build .
COPY entrypoint.sh ./entrypoint.sh
EXPOSE 8000
ENTRYPOINT [ "/app/entrypoint.sh" ]

#target: test
FROM base as test
ENV NODE_ENV test
RUN yarn

#target: development
FROM base as development
ENV NODE_ENV development
RUN yarn

#target: production
FROM base as production
ENV NODE_ENV production
RUN yarn install --production