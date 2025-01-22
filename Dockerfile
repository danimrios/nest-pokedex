# Usa una imagen base de Node.js con la versión requerida
FROM node:22.12.0

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias del proyecto
RUN yarn install --frozen-lockfile

# Expone el puerto de la aplicación (si aplica)
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD ["yarn", "start"]