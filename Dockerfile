FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 4173

# OVERRIDE ENTRYPOINT supaya sandbox bisa jalan diem
CMD ["npm", "run", "preview"]

