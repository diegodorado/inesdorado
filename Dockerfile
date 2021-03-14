# build environment
FROM node:14.16-alpine as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . /usr/src/app
RUN npm install
RUN npm run build

#COPY package.json ./
#COPY package-lock.json ./
COPY . ./
RUN npm install
RUN npm run build

# production environment
FROM nginx:alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
