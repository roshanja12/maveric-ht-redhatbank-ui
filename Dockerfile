# # Stage 1: Build the Angular app
FROM node:14 AS builder

WORKDIR /user/src/app
#### copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

#### install angular cli
RUN npm install -g @angular/cli

#### install project dependencies
RUN npm install

#### copy things
COPY . .

#### generate build --prod
RUN npm run build:ssr
# # Build the Angular app for production
# RUN ng build --prod

# Stage 2: Serve the Angular app
#FROM nginx:latest
FROM nginxinc/nginx-unprivileged

## Copy our nginx config
COPY nginx/ /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## copy over the artifacts in dist folder to default nginx public folder
#COPY --from=build dist/ /usr/share/nginx/html
COPY --from=build /usr/src/app/dist/space/browser /usr/share/nginx/html


# Expose port 80
EXPOSE 8080

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
