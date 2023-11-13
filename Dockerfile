# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:14 as build
# Set the working directory
WORKDIR /app
COPY . .
RUN npm install
# Generate the build of the application
RUN npm run build --prod

# Stage 2: Serve app with nginx server
FROM nginx:latest

#COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx/ /etc/nginx/conf.d/

WORKDIR /code

COPY --from=build /app/dist .

EXPOSE 8080:8080
CMD ["nginx", "-g", "daemon off;"]
