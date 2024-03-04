
# use your version of node
FROM node:16 AS build

# within the container, navigate to /app
WORKDIR /app

#copy from local machine package.json to current folder "./"
COPY package*.json ./

# run npm install inside the container
RUN npm install

# Copy files from local machine [ouput all on container] [select all from local machine]
COPY . .

# run build inside container
RUN npm run build

#inside a new container:
# use nginx "engine x"
FROM nginx:alpine
# nginx has tons of functionality, we will use only a
# simple corner of it execute basic HTTP protocols to send information

# Copy from previous container(above) to this one.
# From the container we called "build" to current [path from above] [path on this container]
COPY --from=build /app/dist/blog-frontend /usr/share/nginx/html

# EXPOSE indicates primarily to users like you, which port is in use inside Docker
# in my quick test, changing to 81, and and removing entirely (here, not in docker-compose.yml)
# did not stop containers from working correctly.
EXPOSE 80

# Command to execute running the app
CMD ["nginx", "-g", "daemon off;"]
