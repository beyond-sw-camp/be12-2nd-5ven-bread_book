// import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
  ],
  server: {
    proxy: {
      // 프록시할 경로
      "/api": {
        // 대상 서버
        target: "https://f1e8f15e-347b-4505-af07-9aeb8e9ff91b.mock.pstmn.io/",
        // 대상 서버의 호스트 헤더 변경 여부
        changeOrigin: true,
        // '/api' 부분 제거
        rewrite: (path) => path.replace(/^\/api/,""),
      },
    },
  },
})
