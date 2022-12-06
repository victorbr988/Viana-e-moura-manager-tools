FROM node:16.14-alpine

WORKDIR /app-backend

COPY package* ./

COPY tsconfig.json ./

COPY ./prisma ./prisma

RUN npm install

RUN npx prisma generate

COPY ./src ./src

RUN npm run build

CMD ["npm", "start"]
