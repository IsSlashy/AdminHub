# Étape de construction de l'application Angular avec Node.js 20
FROM node:20-alpine as angular
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

# Étape de déploiement sur le serveur Apache
FROM httpd:alpine
WORKDIR /usr/local/apache2/htdocs/
COPY --from=angular /app/dist/ /usr/local/apache2/htdocs/


