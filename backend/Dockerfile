FROM node:18

WORKDIR /usr/src/app

COPY packages ./packages
COPY backend ./backend
COPY package*.json .
RUN npm install

WORKDIR /usr/src/app/backend

CMD ["npm", "run", "dev"]