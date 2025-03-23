FROM nginx:latest
COPY ./dist/ /usr/share/nginx/html/
ADD ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80