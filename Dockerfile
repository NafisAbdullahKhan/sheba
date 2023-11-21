FROM mongo-express:1.0.0-20-alpine3.18
WORKDIR /app
COPY . .
RUN yarn
EXPOSE 3000
CMD [ "yarn", "start" ]