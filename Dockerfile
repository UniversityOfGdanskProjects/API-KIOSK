FROM node:18-alpine AS build
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:18-alpine
WORKDIR /app

ARG PORT 
ENV PORT $PORT

ARG MONGO_PATH
ENV MONGO_PATH $MONGO_PATH

ARG MONGO_USER
ENV MONGO_USER $MONGO_USER

ARG MONGO_PASSWORD
ENV MONGO_PASSWORD $MONGO_PASSWORD

COPY --from=build package.json yarn.lock ./
COPY --from=build dist/src ./dist/
RUN yarn install --production
CMD ["yarn", "start"]