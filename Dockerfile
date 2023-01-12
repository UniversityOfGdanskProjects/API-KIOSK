FROM node:18-alpine AS dev
COPY . .
RUN yarn install --frozen-lockfile