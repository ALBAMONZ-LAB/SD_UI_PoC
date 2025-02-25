# Database Structure Options

이벤트 페이지를 구성하는 방식에는 **정규화 테이블 구조**와 **페이지 전체를 하나의 테이블로 저장하는 방식** 두 가지가 있다. 각각의 설계 방식과 장단점을 비교.

### 1. 정규화 테이블 구조

이 방식에서는 **이벤트 정보**와 **캐러셀 정보**를 별도로 저장한다.

#### Events Table

| Column Name | Data Type                           | Description         |
| ----------- | ----------------------------------- | ------------------- |
| id          | SERIAL PRIMARY KEY                  | 이벤트 ID (기본 키) |
| title       | VARCHAR(255) NOT NULL               | 이벤트 제목         |
| description | TEXT                                | 이벤트 설명         |
| start_date  | TIMESTAMP NOT NULL                  | 이벤트 시작일       |
| end_date    | TIMESTAMP NOT NULL                  | 이벤트 종료일       |
| created_at  | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 생성 일자           |

#### Carousels Table

| Column Name | Data Type                                   | Description         |
| ----------- | ------------------------------------------- | ------------------- |
| id          | SERIAL PRIMARY KEY                          | 캐러셀 ID (기본 키) |
| event_id    | INT REFERENCES events(id) ON DELETE CASCADE | 연관된 이벤트 ID    |
| image_url   | VARCHAR(255) NOT NULL                       | 캐러셀 이미지 URL   |
| order       | INT NOT NULL                                | 캐러셀 순서         |

#### ✅ 장점

- **데이터 재사용 가능** → 같은 캐러셀을 여러 이벤트에서 활용 가능
- **유지보수 용이** → 개별 섹션별로 수정 가능
- **데이터 정규화** → 중복 데이터 최소화

#### ❌ 단점

- **복잡한 쿼리** → 여러 테이블을 조인해야 함
- **페이지 로드 성능** → 여러 개의 테이블을 불러와야 해서 성능 저하 가능

---

### 2. 페이지 전체를 하나의 테이블로 저장하는 방식

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

---

### 💡 결론

| 비교 항목       | 모듈화된 테이블 구조            | 페이지 하나로 저장      |
| --------------- | ------------------------------- | ----------------------- |
| **조회 속도**   | 다중 테이블 조회로 느릴 수 있음 | 한 번의 쿼리로 빠름     |
| **유지보수**    | 개별 수정 가능                  | 전체 JSON 수정 필요     |
| **데이터 중복** | 최소화 가능                     | 데이터 중복 가능성 높음 |
| **검색 최적화** | SQL에서 검색 용이               | JSON 내부 검색 어려움   |

##

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
