FROM node:20.10-alpine3.19

WORKDIR /app

COPY package*.json ./
COPY node_modules ./node_modules

COPY server ./server
COPY client ./client
COPY client/node_modules ./client/node_modules

EXPOSE 3000

CMD ["npm", "start", "-w", "server"]
