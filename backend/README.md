<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable-next-line MD041 -->


## Install

Requirements: Php >= 8.4.0 & Composer

- `brew install php@8.4 composer` Mac OS X with brew
- `apt-get install php8.4` Ubuntu with apt-get (use sudo if is necessary)

This step is not necessary when you use Docker.

1. Clone GitHub repo for this project locally:

   ```bash
   git clone git@github.com:felipe-crosa/IHC-253107-252944-271063.git
   ```

2. create a copy of your .env file

   ```bash
   cp .env.example .env
   ```

3. Install composer dependencies with sail included with

    <!-- cspell: disable -->

```bash
   composer install
   ```
   <!-- cspell: enable -->

5. After that you can use laravel sail for running your project.

   ```bash
   sail up
   ```

6. When the app is running, into the bash container (`sail bash`) you can use the following commands:

   ```bash
   php artisan key:generate
   php artisan storage:link
   php artisan ide-helper:generate
   php artisan migrate --seed
   ```
