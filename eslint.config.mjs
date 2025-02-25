// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'], // ESLint가 무시할 파일 설정
  },
  eslint.configs.recommended, // ESLint 기본 추천 설정 적용
  ...tseslint.configs.recommendedTypeChecked, // TypeScript 추천 설정 적용 (타입 체크 포함)
  eslintPluginPrettierRecommended.configs.recommended, // Prettier 추천 설정 적용
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.jest }, // 글로벌 변수 설정 (Node.js, Jest 환경 지원)
      ecmaVersion: 'latest', // 최신 ECMAScript 버전 사용
      sourceType: 'module', // ES 모듈 사용 설정
      parserOptions: {
        projectService: true, // TypeScript 프로젝트 서비스 활성화 (필요한 경우 확인)
        tsconfigRootDir: process.cwd(), // `import.meta.dirname` 대신 `process.cwd()` 사용 (Node.js 지원)
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // `any` 타입 사용을 허용
      '@typescript-eslint/no-floating-promises': 'warn', // 프로미스 핸들링을 강제하지 않지만 경고 표시
      '@typescript-eslint/no-unsafe-argument': 'warn', // 타입 안전하지 않은 인자 사용 시 경고 표시
    },
  },
);