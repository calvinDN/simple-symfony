FROM php:7.1-apache

RUN apt-get update && apt-get -y --no-install-recommends install \
  mysql-client \
  && docker-php-ext-install -j$(nproc) pdo_mysql \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY docker/bin/* /usr/local/bin/
COPY docker/apache/apache.conf /etc/apache2/sites-available/
RUN a2ensite apache && a2dissite default-ssl && a2dissite 000-default

COPY . /var/www/html/

WORKDIR /var/www/html/

# Set writable permissions
RUN rm -rf var/cache/*
RUN chown -R www-data:www-data var/
RUN chmod 775 var/cache/
RUN chmod 775 var/logs/
RUN chmod -R 775 var/sessions/

EXPOSE 80

CMD ["sh", "-c", "assert-mysql && apache2-foreground"]