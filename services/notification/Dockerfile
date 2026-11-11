FROM node:22-bookworm-slim
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
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
COPY packages packages
COPY services/notification services/notification
RUN npm run build -w packages/events \
  && npm run build -w packages/auth \
  && npm exec -w services/notification -- prisma generate \
  && npm run build -w services/notification
RUN chmod +x /app/services/notification/docker-entrypoint.sh
ENV NODE_ENV=production
EXPOSE 3000
ENTRYPOINT ["/app/services/notification/docker-entrypoint.sh"]
