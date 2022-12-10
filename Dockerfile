FROM node:18-alpine AS build
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build

FROM node:18-alpine
WORKDIR /app
COPY --from=build package.json yarn.lock .env ./
COPY --from=build dist ./dist/
RUN yarn install
CMD ["yarn", "start"]