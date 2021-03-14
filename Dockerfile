# build environment
FROM node:14.16-alpine as builder
RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

# separate COPY package from the rest of the app
# to do npm install on package.json change only
COPY . .
RUN npm run build

# production environment
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
