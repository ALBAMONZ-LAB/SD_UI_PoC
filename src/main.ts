import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { GraphQLSchema } from 'graphql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // cors 허용

  app.enableCors({
    origin: '*', // https://studio.apollographql.com/sandbox/explorer 에서 테스트 가능 (전부혀용 true).
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // 쿠키, 인증 헤더 등을 사용여부
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(process.env.PORT ?? 3000);
  // GraphQL Schema 가져오기
  const gqlSchemaHost = app.get(GraphQLSchemaHost);
  const schema: GraphQLSchema = gqlSchemaHost.schema;

  // 스키마 정보 출력 (예: 콘솔 로그로 확인)
  console.log('Generated GraphQL Schema:', schema);
}

bootstrap();
