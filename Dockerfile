FROM node:18-alpine as builder
COPY . . 
RUN yarn install
RUN yarn build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder package.json yarn.lock /app/
COPY --from=builder dist/src/ /app/dist/
RUN yarn install --production=true
ENTRYPOINT [ "yarn", "start" ]