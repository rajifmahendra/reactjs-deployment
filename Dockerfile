# Gunakan image Node.js sebagai base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file proyek ke dalam container
COPY . .

# Build aplikasi React untuk production
RUN npm run build

# Gunakan image Nginx untuk serve aplikasi React
FROM nginx:stable-alpine

# Copy file build React ke direktori Nginx default
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80 untuk Nginx
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
