FROM node:20-alpine AS build
WORKDIR /app

# Instala dependencias
COPY package.json package-lock.json ./
RUN npm ci

# Copia el resto del proyecto y construye
COPY . .
RUN npm run build -- --configuration=production

# Imagen final para servir estáticos
FROM nginx:1.25-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Angular 17 application builder suele generar /dist/<proyecto>/browser
COPY --from=build /app/dist/polimarket-client/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
