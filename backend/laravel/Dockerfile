FROM creativeworkx/php7.2-apache

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

EXPOSE 8000