FROM node:20.11.1-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD npx prisma generate && npx prisma migrate dev --name init && npm run start:dev
