## nest-node-boilerplate

# Template de microserviço

```bash
$ npm install
```

## create .env file with

```
PORT=3000
CURRENT_ENVIRONMENT=DEV
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=book
```

## startup docker

```bash
make up-postgres-daemom
```

## Run migrations

```bash
npm run migrations:up
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# development
$ npm run start

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Todo

[] Implementar padrão de testes

[x] Definir classes bases para repository, paginação

[x] Definir DTO genericos

[x] Implementar métodos genericos

[x] Implementar middwlare para validar tenantId

[x] Docker-compose, makefile,

[x] Testes em memoria

[x] Heltcheck

[x] configurar migrations

[] Implementar logger

[] Lint para nomes de arquivos

https://wanago.io/2020/07/13/api-nestjs-testing-services-controllers-integration-tests/

https://github.com/jmcdo29/testing-nestjs/tree/master/apps

https://circleci.com/blog/getting-started-with-nestjs-and-automatic-testing/

https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md
