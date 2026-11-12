FROM node:22-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/events/package.json packages/events/
COPY packages/auth/package.json packages/auth/
COPY services/identity/package.json services/identity/
COPY services/notification/package.json services/notification/
COPY services/payments/package.json services/payments/
COPY gateway/package.json gateway/
COPY web/package.json web/
RUN npm install -g npm@12.2.1 && npm ci
COPY packages/auth packages/auth
COPY gateway gateway
RUN npm run build -w packages/auth && npm run build -w gateway
ENV NODE_ENV=production
EXPOSE 8080
WORKDIR /app/gateway
CMD ["node", "dist/main.js"]
