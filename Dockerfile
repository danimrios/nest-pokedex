# 1. Instalar dependencias solo cuando sea necesario
FROM node:22.12.0-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 2. Construir la aplicación con dependencias en caché
FROM node:22.12.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
RUN yarn build

# 3. Imagen para producción
FROM node:22.12.0-alpine AS runner

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar solo lo necesario para producción
COPY package.json yarn.lock ./
RUN yarn install --prod --frozen-lockfile
COPY --from=builder /app/dist ./dist
COPY .env ./

# Opcional: Crear un usuario seguro
RUN adduser -D pokeuser
RUN chown -R pokeuser:pokeuser /usr/src/app
USER pokeuser

# Exponer el puerto
EXPOSE 3000

# Comando de inicio
CMD ["node", "dist/main"]
