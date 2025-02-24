
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

You can test these queries in a GraphQL playground.

```
query {
  getCards {
    resultCode
    resultMessage
    totalCount
    row
    column
    collection {
      franchiseCode
      franchiseName
      franchiseLogo
      keywordCode
      keywordName
      partCode
      partName
    }
  }
}

```

```
query {
  getEventPageComponents(eventId: "event-123") {
    resultCode
    resultMessage
    eventId
    components {
      ... on TitleComponent {
        type
        text
        fontSize
        fontWeight
        color
      }
      ... on FloatingButtonComponent {
        type
        text
        backgroundColor
        textColor
        bottom
        onClick
      }
    }
  }
}
```