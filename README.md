1. npm install
2. composer install
3. замените в env файле подключение к базе данных
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=laravel
   DB_USERNAME=root
   DB_PASSWORD=

    На
    DB_CONNECTION=sqlite

4. php artisan key:generate
   Создание БД
5. create file database/database.sqlite
6. php artisan migrate
7. npm run dev

    Старт программы
    php artisan serve
