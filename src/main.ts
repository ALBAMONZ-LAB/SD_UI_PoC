import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { GraphQLSchema } from 'graphql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Event API')
    .setDescription('이 API는 이벤트 페이지를 관리하는 API입니다.')
    .setVersion('1.0')
    .addTag('Event Page')
    .build();

  app.enableCors({
    origin: '*', // https://studio.apollographql.com/sandbox/explorer 에서 테스트 가능 (전부혀용 true).
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  // GraphQL Schema 가져오기
  const gqlSchemaHost = app.get(GraphQLSchemaHost);
  const schema: GraphQLSchema = gqlSchemaHost.schema;

  // 스키마 정보 출력 (예: 콘솔 로그로 확인)
  // console.log('Generated GraphQL Schema:', schema);
}

bootstrap();
