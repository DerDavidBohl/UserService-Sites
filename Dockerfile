
FROM node:alpine as builder
WORKDIR /usr/src/
COPY . ./beerpong-fe
WORKDIR /usr/src/beerpong-fe
RUN npm install
#ENV PATH /usr/src/beerpong-fe/node_modules/.bin:$PATH
RUN npm run ng build -- --prod --output-path=dist

FROM nginx

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/beerpong-fe/dist /usr/share/nginx/html

RUN envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js

EXPOSE 80

CMD nginx -g 'daemon off;'
