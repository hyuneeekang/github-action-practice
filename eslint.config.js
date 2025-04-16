// JavaScript, React(v19), React Testing Library 프로젝트를 위한 통합 린팅 규칙 설정

import js from '@eslint/js';
import globals from 'globals'; // 전역 변수 설정
import react from 'eslint-plugin-react'; // React 규칙
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import testingLibrary from 'eslint-plugin-testing-library';
import jestdomLibrary from 'eslint-plugin-jest-dom';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.js', '**/*.jsx'],
    /*-------------------
    언어 및 파서 설정
    -------------------*/
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...react.configs.recommended.rules,
      'prettier/prettier': 'error', // Prettier 룰 위반 시 오류로 표시
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{js,jsx}', '**/__tests__/**/*.[jt]?(s)x', '**/*.{test,spec}.[jt]?(s)x'],

    /*-------------------
    플러그인 설정
    -------------------*/
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'testing-library': testingLibrary,
      'jest-dom': jestdomLibrary,
    },
    /*-------------------
    상세 린팅 규칙
    -------------------*/
    rules: {
      // ...react.configs.flat['jsx-runtime'].rules, // JSX 런타임 관련 규칙 적용 (React 17+에서 JSX 필요 없음)
      ...reactHooks.configs.recommended.rules, // React Hooks 추천 규칙 적용
      ...jestdomLibrary.configs.recommended.rules,
      ...testingLibrary.configs.react.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/no-dom-import': 'off',
      'jest-dom/prefer-checked': 'error',
      'jest-dom/prefer-enabled-disabled': 'error',
      'jest-dom/prefer-required': 'error',
      'jest-dom/prefer-to-have-attribute': 'error',
    },
  },
];
