FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder" npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push && node dist/main.js"]