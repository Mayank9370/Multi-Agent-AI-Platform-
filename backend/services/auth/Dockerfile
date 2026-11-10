FROM node:20-alpine

WORKDIR /app

COPY services/auth/package.json services/auth/package-lock.json ./

RUN npm ci --omit=dev

COPY shared /shared

COPY services/auth .

EXPOSE 8001

CMD ["node", "index.js"]