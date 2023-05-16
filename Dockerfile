FROM node:16.18.0 as build

WORKDIR /react-app

COPY ./damatta_frontend/package*.json /react-app/

RUN npm install

COPY ./damatta_frontend /react-app/

ENV REACT_APP_ENV=${REACT_APP_ENV}
ENV REACT_APP_PROD_API_URL=${REACT_APP_PROD_API_URL}

RUN npm run build

FROM nginx

COPY --from=build /react-app/build /usr/share/nginx/html

COPY ./damatta_frontend/nginx.conf /etc/nginx/nginx.conf

COPY ../ssl/*.pem /etc/nginx/ssl/

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]