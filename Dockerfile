FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Install http-server untuk serving dist folder
RUN npm install -g http-server

EXPOSE 4173
CMD ["http-server", "dist", "-p", "4173"]
