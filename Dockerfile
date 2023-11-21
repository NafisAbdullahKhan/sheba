#target: base
FROM mongo-express:1.0.0-20-alpine3.18 as base
WORKDIR /app
COPY build .
EXPOSE 8000

#target: development
FROM base as development
ENV NODE_ENV development
RUN yarn
CMD [ "yarn", "start:development" ]

#target: production
FROM base as production
ENV NODE_ENV production
RUN yarn install --production
CMD [ "yarn", "start:production" ]