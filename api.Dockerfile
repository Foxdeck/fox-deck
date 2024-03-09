FROM node:20.11.1-alpine3.19 as api-stage
WORKDIR /usr/src/app
COPY apps/fox-deck-api/package*.json ./
RUN npm ci --prefer-offline --no-audit --progress=false
COPY apps/fox-deck-api/ .
COPY apps/fox-deck-api/.env.example /usr/src/app/.env
RUN npm run prisma:migrate
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
