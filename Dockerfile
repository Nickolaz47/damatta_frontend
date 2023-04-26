FROM node:16.18.0

WORKDIR /react-app

COPY package*.json /react-app

RUN npm install

COPY . .

ENV REACT_APP_ENV=${REACT_APP_ENV}
ENV REACT_APP_PROD_API_URL=${REACT_APP_PROD_API_URL}

RUN npm run build