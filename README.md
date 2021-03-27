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

[x] Lint para nomes de arquivos(Parou de funcionar)

[x] Implementar padrão de testes(precisa ser melhorado)

[] Resolver os problema de propriedades snake_case "created_at", "updated_at", "deleted_at" para camelCase (conversão automatica)

[] criar um guia de boas práticas

[] Implementar logger

[] Transações

Algumas decisões devem ser tomadas em conjunto:

- abstract ou repository(classe que extende do repository base) Deixar acessar a classe repository do nest na service ou obrigar a impletar qualquer query no repository?

- teste em memoria usando o sqlite vai restringir muito as opções de usar recursos do postgres.(Eu particulamente não acho válido perder recursos)
  Por exemplo, os meninos do retail escrevem muitas queries brutas. Usando sqlite vai restringir(se tiver algum serviço dessas características).

- escolher um serviço para implementar e validar várias ideia proposta no projeto.

- usar o code artifact da AWS para publicar pacote privados, transformando algumas classe desse projeto em pacote(diminuir tempo de teste e centralizar as mudanças em classes bases) e testes alguns testes são pesados pra ficar junto com os microserviços

https://wanago.io/2020/07/13/api-nestjs-testing-services-controllers-integration-tests/

https://github.com/jmcdo29/testing-nestjs/tree/master/apps

https://circleci.com/blog/getting-started-with-nestjs-and-automatic-testing/

https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md

https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
