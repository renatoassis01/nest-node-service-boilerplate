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

## Startup PostgreSQL(via docker)

```bash
make up-postgres-daemon
```

## Run migrations

```bash
npm run migration:up
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

[x] Definir classes bases para repository, paginação

[x] Definir DTO genericos

[x] Implementar métodos genericos

[x] Implementar middwlare para validar tenantId

[x] Docker-compose, makefile,

[x] Testes em memoria

[x] Heltcheck

[x] configurar migrations

[x] Lint para nomes de arquivos

[x] Implementar padrão de testes(precisa ser melhorado)

[] Resolver os problema de propriedades snake_case "created_at", "updated_at", "deleted_at" para camelCase (conversão automatica)

[] criar um guia de boas práticas

[] Implementar logger

[] Transações

https://wanago.io/2020/07/13/api-nestjs-testing-services-controllers-integration-tests/

https://github.com/jmcdo29/testing-nestjs/tree/master/apps

https://circleci.com/blog/getting-started-with-nestjs-and-automatic-testing/

https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md

https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
