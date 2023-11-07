# Specify the base image for Node.js
FROM node:16-alpine AS build

# Create a working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build

# Stage 2: Serve the Angular app using a web server
FROM nginx:alpine

# Copy the built Angular app from the previous stage to the Nginx directory
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Expose the port on which the application will run (usually 80)
EXPOSE 80

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
