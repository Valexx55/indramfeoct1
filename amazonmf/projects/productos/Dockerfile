FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY angular.json tsconfig*.json ./
COPY projects ./projects

RUN npm install

RUN npm run build productos -- --configuration=production

FROM nginx:1.27-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY projects/productos/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/productos /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]