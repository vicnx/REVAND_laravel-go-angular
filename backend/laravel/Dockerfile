FROM creativeworkx/php7.2-apache
# WORKDIR /app
# COPY . .
RUN apt-get update
RUN apt-get install -y dialog apt-utils
RUN apt-get install -y php-gd php-xml php7.2-mbstring
RUN apt-get install -y php7.2-xml
RUN apt-get install -y php7.2-mysql
RUN apt install -y php7.2-cli
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer
RUN apt-get install -y zip unzip php7.2-zip
RUN apt-get install -y git
RUN apt install -y zip unzip php-zip
# RUN composer install
# RUN composer update laravel/framework
# RUN cp .env.example .env
# RUN php artisan key:generate
# RUN php artisan route:list
# RUN php artisan migrate

EXPOSE 8000

# CMD ["php","artisan","migrate"]

# CMD [ "php","artisan","serve", "--host=0.0.0.0","--port=8000" ]