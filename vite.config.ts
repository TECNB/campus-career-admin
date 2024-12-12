import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),

  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',	//实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        // 显示请求代理后的真实地址
        bypass(req, res, options) {
          const url = req.url || ""; // 确保 req.url 不为 undefined
          const rewriteFunction = options.rewrite || ((path) => path); // 确保 options.rewrite 是一个函数
          const proxyUrl = new URL(rewriteFunction(url), options.target)?.href || "";
          console.log("proxyUrl", proxyUrl);
          req.headers["x-req-proxyUrl"] = proxyUrl;
          res.setHeader("x-res-proxyUrl", proxyUrl);
        },
      },
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  }

})
