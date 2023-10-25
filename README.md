# Prisma 
an open source tool that makes it fun and safe to work with your database. It replaces traditional ORMs and makes database access easy with an auto-generated query builder for TypeScript & Node.js.

# Why use Prisma?
- writing sql code is not an ideal abstraction for modern app development, prisma is an orm that address like object relational mapping to express data with object oriented code like javascript classes
- it has it's own schema definition language that is used to define the data model of your application, or the schema can be autmatically inferred from an existing database

## Prisma with MySQL and typescript
initial setup for prisma with mysql and typescript
```
$ npm init -y
$ npm i --save-dev prisma typescript ts-node @types/node nodemon
$ npx prisma init
```

```$ npx prisma format``` 


for formating prisma schema, it wil be auto formated using extension of prisma in vscode 

### extension used 
- prisma

### updating the .env file
*  for a MySQL database hosted on AWS RDS or any online platform : DATABASE_URL="mysql://johndoe:XXX@mysql–instance1.123456789012.us-east-1.rds.amazonaws.com:3306/mydb" 
* for a MySQL database hosted locally : DATABASE_URL="mysql://johndoe:XXX@localhost:3306/mydb"

### Prisma schema
- Prisma schema is the source of truth for your database schema and your Prisma Client API
- [learn more here]("https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-mysql")

## Prisma migration
```$ npx prisma migrate dev --name init```
- creates a new SQL migration file for this migration
- runs the SQL migration file against the database
- every change save in the code will be reflected in db
- every time we make changes in schema we need to use this commnad to migrate those changes to db

## Prisma client basis
```$ npm i @prisma/client```
```$ npx prisma generate```
- use npx prisma genearte to generate the prisma client every time we make changes in schema


