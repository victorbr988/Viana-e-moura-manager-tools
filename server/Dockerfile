FROM node:16.15-alpine

WORKDIR /app-backend

COPY package*.json ./

COPY ./prisma ./prisma

COPY tsconfig.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
