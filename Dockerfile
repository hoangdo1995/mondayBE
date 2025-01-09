# Sử dụng một hình ảnh Node.js chính thức
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Biên dịch mã TypeScript sang JavaScript
RUN npm run build

# Mở cổng mặc định của ứng dụng NestJS (thường là 3000)
EXPOSE 3000

# Lệnh khởi chạy ứng dụng
CMD ["npm", "run", "start:prod"]
