FROM node:20.11.1-alpine3.19 as build-stage
WORKDIR /app
COPY apps/fox-deck-app/package*.json ./
RUN npm install --prefer-offline --no-audit --progress=false
COPY apps/fox-deck-app/ .

RUN npm run build
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY apps/fox-deck-app/nginx.conf /etc/nginx/conf.d/
EXPOSE 80