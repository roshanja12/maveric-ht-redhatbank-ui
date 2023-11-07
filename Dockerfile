# Stage 1: Build the Angular app
FROM node:14 AS builder

WORKDIR /app
COPY . .

# Install Angular CLI globally if not already installed
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Build the Angular app for production
RUN ng build --prod

# Stage 2: Serve the Angular app
FROM nginx:latest

# Copy the built Angular app from the builder stage
COPY --from=builder /app/dist/red-hat-bank /usr/share/nginx/html

# Expose port 80
EXPOSE 4200

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
