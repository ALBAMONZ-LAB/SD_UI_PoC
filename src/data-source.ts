import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { DataSource } from 'typeorm';

dotenv.config(); // TypeORM CLI(typeorm migration:generate)는 NestJS 애플리케이션을 실행하는 게 아니라, data-source.ts만 실행해서 dotenv로 준다.

// `migrations` 폴더가 없으면 자동 생성
const migrationsDir = 'src/migrations';
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir);
} else {
  // `migrations` 폴더에 기존 파일이 있으면 모두 삭제
  const files = fs.readdirSync(migrationsDir);
  files.forEach(file => {
    const filePath = `${migrationsDir}/${file}`;
    if (fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath); // 파일 삭제
    }
  });
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 5432),
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  migrationsTableName: 'migrations',
});
