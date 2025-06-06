FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "start", "--", "-H", "0.0.0.0", "-p", "80"]