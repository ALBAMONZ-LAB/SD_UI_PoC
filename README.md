
## Description

### Directory path

```
src/
├── app.module.ts         // Set up GraphQLModule and create a GraphQL server
└── cards/                
    ├── models/           
    │   └── card.model.ts // Define GraphQL types
    ├── cards.module.ts   // Manage NestJS dependencies
    ├── cards.resolver.ts // Link GraphQL queries to data
    ├── cards.service.ts  // Handle business logic
    └── data/             
        └── cardData.ts   // Dummy card data

```





## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

