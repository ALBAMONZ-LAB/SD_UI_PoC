# Database Structure Options

## 로컬 개발 환경 설정

이 프로젝트는 **PostgreSQL 16.8**을 사용합니다.

### 1. PostgreSQL 설치

- [PostgreSQL 공식 다운로드](https://www.postgresql.org/download/)에서 운영체제에 맞는 버전(16.8) 설치
- 설치 과정에서 **사용자 계정(username)과 비밀번호(password) 설정** (각자 환경에 맞게 설정)

### 2. 데이터베이스 생성

- **pgAdmin, DBeaver 등 데이터베이스 관리 도구**를 사용하여 데이터베이스 생성
- 데이터베이스 이름(DB Name), 사용자 이름(Username), 설치시 비밀번호(Password)는 각자 환경에 맞게 설정
- 데이터베이스 이름(DB Name) : event_pages / event_history

### 3. `.env` 파일 설정

- 프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 아래 내용을 추가:
  ```env
  DB_TYPE=postgres
  DB_HOST=localhost
  DB_PORT=5432
  DB_USERNAME=
  DB_PASSWORD=
  DB_NAME=
  ```
  **⚠️ 각자 로컬에서 설정한 `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME` 값을 입력!**

### 4. 프로젝트 실행

- 패키지 설치 후 db와 연동이 잘 되었는지 서버 실행
  (에러 안나면 디비연동 성공)
  ```bash
  npm install
  npm run start:dev
  ---
  pnpm install
  pnpm start:dev
  ```

### 5. DB 로컬 마이그레이션 진행 플로우

4번까지 완료 되었을 경우 진행.

1. **엔티티 파일 변경 확인**

   - `src/*/entity.ts` 엔티티 파일 추가 및 변경
   - `migration:generate`스크립트를 실행하면 새로운 엔티티가 추가되었거나 기존 엔티티가 수정되었는지 확인(package.json에 스크립트 한번에 추가해둠)
   - `migration:run` 마이그레이션 실행 (DB에 테이블 생성)

2. **마이그레이션 스크립트 실행**

   ```bash
   npm migrations:generate
   npm run migrations:run 
   ```

   또는

   ```bash
   pnpm migrations:generate
   pnpm run migrations:run

   ```

3. **마이그레이션 파일 자동생성**

   - `src/migrations` 폴더에 새로운 마이그레이션 파일이 생성됨 (없을 경우 자동생성)
   - `src/migrations/0000-InitDatabase.ts` 마이그레이션 파일 자동추가 (엔티티 변경될 경우 이전 버전 삭제 후 자동 생성)

4. **마이그레이션 적용 (DB 반영)**
   - 데이터베이스에 테이블이 생성 및 업데이트됨
   - pgAdmin, DBeaver 등을 이용하여 테이블 정상 생성 확인

**✅ 작업이완료 되면 DB Table 확인. (entity에 맞게 테이블이 생성됨)**

<br />

## Event Page

이 방식에서는 이벤트 페이지 데이터를 JSON으로 통째로 저장한다.

### Table Schema

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

## Event history

이 테이블은 이벤트 페이지 데이터가 변경될 때마다 해당 변경 이력을 저장합니다.

| Column Name        | Data Type                                        | Description                 |
| ------------------ | ------------------------------------------------ | --------------------------- |
| id                 | SERIAL PRIMARY KEY                               | 이력 ID (기본 키)           |
| event_page_id      | INT REFERENCES event_pages(id) ON DELETE CASCADE | 연관된 이벤트 페이지 ID     |
| previous_page_json | JSONB NOT NULL                                   | 변경되기 전의 페이지 데이터 |
| changed_page_json  | JSONB NOT NULL                                   | 변경된 후의 페이지 데이터   |
| change_reason      | TEXT                                             | 변경 사유 (선택 사항)       |
| changed_by         | VARCHAR(100)                                     | 변경한 사용자               |
| changed_at         | TIMESTAMP DEFAULT CURRENT_TIMESTAMP              | 변경 일자                   |

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

### 특정 이벤트 페이지 조회

```
query {
  getEventPageComponents(eventId: 2) {
    id
    eventId
    pageJson
    createdAt
  }
}
```

### 이벤트 추가

```
mutation {
  createEventPage(createEventPageInput: {
    eventId: 5,
    pageJson: "{ \"title\": \"New Event5\", \"content\": \"This is a new event page5.\" }"
  }) {
    success
    message
    data {
      id
      eventId
      pageJson
      createdAt
    }
  }
}
```
