[![Build Status](https://travis-ci.org/calvinDN/simple-symfony.svg?branch=master)](https://travis-ci.org/calvinDN/simple-symfony)
# Simple App

## Installation

### Docker
1. `composer install`
2. `docker-compose up --build -d`
3. localhost:8888

### Local
1. `composer install`
2. Run `yarn`
3. Setup Apache with `docker/apache/apache.conf`

Ideas
-----
- Simple elo tracking app
    - user login / registration
    - generic, support multiple activitie at once
    - user - add new game
    - admin - add, delete, update games
    - graphs
- Simple REST api
- HATEOAS
- Datatables
- Break into components

To Do
-----
- Secure rest
- Secure sns with cognito, dev login
- write tests for rest
- fix user post roles
- Localization

Known Issues
------------
- Exception after multiple failed login attempts

Roadmap
-------
- [x] Docker
- [x] Travis CI
- Convert to serverless
