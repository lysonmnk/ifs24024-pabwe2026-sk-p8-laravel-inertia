FROM php:8.4-cli-alpine

# Install system dependencies & PHP extensions
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    zlib-dev \
    libzip-dev \
    sqlite-dev \
    postgresql-dev \
    nodejs \
    npm \
    && docker-php-ext-configure gd --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) gd pdo_sqlite pdo_pgsql pgsql zip bcmath

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www

# Copy application files
COPY . .

# Setup environment file
RUN cp .env.example .env && \
    sed -i 's/DB_CONNECTION=pgsql/DB_CONNECTION=sqlite/g' .env && \
    sed -i 's/APP_ENV=local/APP_ENV=production/g' .env && \
    sed -i 's/APP_DEBUG=true/APP_DEBUG=false/g' .env

# Install Composer dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Install npm dependencies & build assets
RUN npm install --ignore-scripts && npm run build

# Setup application key, storage link, database, and permissions
RUN php artisan key:generate --force && \
    php artisan storage:link && \
    mkdir -p database && \
    touch database/database.sqlite && \
    php artisan migrate --force --seed && \
    chmod -R 777 storage bootstrap/cache database

EXPOSE 10000

ENV PORT=10000
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-10000}
