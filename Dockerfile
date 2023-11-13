# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18-alpine as build
# Set the working directory
WORKDIR /app
COPY . .

#### install angular cli
RUN npm install -g @angular/cli

RUN npm install -g npm@10.2.3

RUN npm install

# Generate the build of the application
RUN npm run build --prod

# Stage 2: Serve app with nginx server
FROM quay.io/jitesoft/nginx:latest

#COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx/ /etc/nginx/conf.d/

#WORKDIR /code
COPY --from=build /app/dist/ /usr/share/nginx/html

#COPY --from=build /app/dist .

EXPOSE 8080:8080
CMD ["nginx", "-g", "daemon off;"]
