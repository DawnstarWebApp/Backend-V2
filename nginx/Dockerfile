FROM nginxinc/nginx-unprivileged:1-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY default.conf /etc/nginx/conf.d

RUN  mkdir -p /var/cache/nginx

RUN chmod 755 /var/cache/nginx

USER nginx