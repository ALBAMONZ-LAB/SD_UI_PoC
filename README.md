# Database Structure Options

## 1. 페이지 전체를 하나의 테이블로 저장하는 방식

이 방식에서는 이벤트 페이지 데이터를 JSON으로 통째로 저장한다.

#### Event Pages Table

| Column Name | Data Type                                          | Description         |
| ----------- | -------------------------------------------------- | ------------------- |
| id          | SERIAL PRIMARY KEY                                 | 페이지 ID (기본 키) |
| event_id    | INT UNIQUE REFERENCES events(id) ON DELETE CASCADE | 연관된 이벤트 ID    |
| page_json   | JSONB NOT NULL                                     | 페이지 전체 데이터  |
| created_at  | TIMESTAMP DEFAULT CURRENT_TIMESTAMP                | 생성 일자           |

```json
{
  "header": {
    "title": "이벤트 제목",
    "link_url": "/event-detail"
  },
  "carousel": [
    {
      "image_url": "https://example.com/banner1.jpg",
      "link_url": "/product1"
    },
    {
      "image_url": "https://example.com/banner2.jpg",
      "link_url": "/product2"
    }
  ],
  "footer": {
    "content": "© 2025 이벤트 페이지"
  }
}
```

#### ✅ 장점

- **빠른 조회** → 한 번의 쿼리로 전체 페이지 데이터 로드 가능
- **쿼리 단순화** → 단순한 `SELECT` 문으로 조회 가능
- **트랜잭션 관리 용이** → 데이터 일관성 유지 쉬움

#### ❌ 단점

- **유지보수 어려움** → 특정 섹션만 수정하려면 JSON 전체를 수정해야 함
- **데이터 중복** → 여러 이벤트에서 같은 데이터가 중복될 가능성 높음
- **검색 최적화 어려움** → JSON 내부 데이터를 직접 검색하기 어려움

## 3.결론

| 비교 항목       | 모듈화된 테이블 구조            | 페이지 하나로 저장      |
| --------------- | ------------------------------- | ----------------------- |
| **조회 속도**   | 다중 테이블 조회로 느릴 수 있음 | 한 번의 쿼리로 빠름     |
| **유지보수**    | 개별 수정 가능                  | 전체 JSON 수정 필요     |
| **데이터 중복** | 최소화 가능                     | 데이터 중복 가능성 높음 |
| **검색 최적화** | SQL에서 검색 용이               | JSON 내부 검색 어려움   |

---

<br />

# Back-End Description

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
