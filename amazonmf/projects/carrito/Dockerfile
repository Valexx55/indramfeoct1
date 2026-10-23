#FASE 1 COMPILACIÓN DEL PROYECTO
#imagen de la que partimos ng 15 --> node 18
FROM node:18-alpine AS build

#definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

#copiamos los recursos necesarios del proyecto a nuestro directorio de trabajo
COPY package*.json ./
COPY angular.json tsconfig*.json ./
COPY projects ./projects

#descargamos la dependecias
RUN npm install

#compilamos el proyecto
RUN npm run build carrito -- --configuration=production

#FASE 2 una vez compilado el proyecto, preparamos el entorno del ejecución
#nginx es un servidor web ligero
FROM nginx:1.27-alpine

#borramos la configuración del servidor de la imagen
RUN rm /etc/nginx/conf.d/default.conf

#y copiamos la configuración nuestra, para que el servidor web
#escuche el puerto que yo quiera, la página de inicio, etc..
COPY projects/carrito/nginx.conf /etc/nginx/conf.d/default.conf

#copiamos la dist compilada generada en la fase anterior y la copiamos
#al direcotorio del servidor
COPY --from=build /app/dist/carrito /usr/share/nginx/html

# Documenta que este contenedor escucha en el puerto 80.
# No publica el puerto por sí solo, pero deja claro cuál usa la aplicación.
EXPOSE 80

# Comando que se ejecuta al arrancar el contenedor.
# "daemon off;" hace que nginx se quede en primer plano, como necesita Docker.
CMD ["nginx", "-g", "daemon off;"]