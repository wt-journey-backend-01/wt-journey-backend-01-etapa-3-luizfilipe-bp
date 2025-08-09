# Instruções para Execução do Projeto

## 1. Pré-requisitos

-   Certifique-se de que o **Docker** está instalado em sua máquina.

## 2. Configuração do Ambiente

-   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=policia_db
NODE_ENV=development
```

## 3. Subindo o Container Docker

-   No terminal, execute o comando para subir o container:

```bash
docker compose up -d
```

-   Para verificar se o container está rodando:

```bash
docker ps
```

## 4. Executando as Migrations

-   As migrations criam as tabelas do banco de dados.
-   Na raiz do projeto, execute:

```bash
npx knex migrate:latest
```

## 5. Executando as Seeds

-   As seeds populam o banco de dados para facilitar o desenvolvimento e testes.
-   Execute o comando:

```bash
npx knex seed:run
```

-   Após a execução, o banco estará populado.

## 6. Script Extra: Reset do Banco

-   O projeto possui um script que derruba o container, recria, executa as migrations e popula o banco com as seeds.
-   Para utilizá-lo, execute:

```bash
npm run db:reset
```
