FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# OVERRIDE ENTRYPOINT supaya sandbox bisa jalan diem
ENTRYPOINT ["sleep", "3600"]
