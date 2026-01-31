#Stage 1
FROM node:alpine AS build-step

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build --prod
# Stage 2

# FROM nginx:1.29.4-alpine
# COPY --from=build-step /app/dist/balance /usr/share/nginx/html