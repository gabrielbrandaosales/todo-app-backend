FROM node:18-alpine

WORKDIR /app

# Copy backend files
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]