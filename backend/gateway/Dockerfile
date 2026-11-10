FROM node:20-alpine

WORKDIR /app

COPY gateway/package.json gateway/package-lock.json ./

RUN npm ci --omit=dev

COPY shared /shared

COPY gateway .

EXPOSE 8000

CMD ["node", "index.js"]