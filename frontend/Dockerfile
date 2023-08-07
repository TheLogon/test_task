FROM node:16
WORKDIR /app
COPY . .
RUN npm install -D @swc/cli @swc/core
RUN npm install
EXPOSE 3000
CMD [ "npm" , "run" , "dev" ]