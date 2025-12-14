// vitest.config.mts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'], // 파일명이 바뀌었다면 .mts로 수정
    server: {
      deps: {
        inline: ['react-native'],
      },
    },
    alias: {
      'react-native': 'react-native-web',
    },
  },
  resolve: {
    alias: [
      {
        find: /\.svg$/,
        replacement: resolve(__dirname, './__mocks__/svgMock.js'),
      },
    ],
  },
});
