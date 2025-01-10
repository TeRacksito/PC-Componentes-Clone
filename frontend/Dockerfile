FROM node:20

WORKDIR /usr/src/app

COPY packages ./packages
COPY frontend ./frontend
COPY package*.json .
RUN npm install

WORKDIR /usr/src/app/frontend

CMD ["npm", "run", "dev", "--", "--host"]

