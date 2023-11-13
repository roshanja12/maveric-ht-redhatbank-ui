# # Stage 1: Build the Angular app
# FROM node:14 AS builder

# WORKDIR /app
# COPY . .

# # Install Angular CLI globally if not already installed
# RUN npm install -g @angular/cli

# # Install project dependencies
# RUN npm install

# # Build the Angular app for production
# RUN ng build --prod

# Stage 2: Serve the Angular app
FROM nginx:latest

## Copy our nginx config
COPY nginx/ /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## copy over the artifacts in dist folder to default nginx public folder
COPY dist/ /usr/share/nginx/html

# Expose port 80
EXPOSE 8080

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
