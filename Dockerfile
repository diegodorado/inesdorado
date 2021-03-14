# build environment
FROM node:14.16-alpine as builder
RUN mkdir /app
WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm --verbose install

COPY . .
RUN npm run build

# production environment
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
