import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { theme } from 'ant-design-vue/lib';
import convertLegacyToken from 'ant-design-vue/lib/theme/convertLegacyToken';
import path from 'path';

const { defaultAlgorithm, defaultSeed } = theme;

const mapToken = defaultAlgorithm(defaultSeed);
const v3Token = convertLegacyToken(mapToken);
const base = path.resolve(__dirname, '../pc');

function sideEffects(from: string) {
  console.log('`${from}/style/index`: ', `${from}/style/index`);
  return `${from}/style/index`;
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^..\/pc\/(.*)$/,
        replacement: `${base}/$1.ts`,
        customResolver(resolve) {
          return resolve;
        },
      },
    ],
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        {
          type: 'component',
          resolve: componentName => {
            if (componentName.startsWith('Gupo')) {
              const name = componentName.slice(4).toLowerCase();
              const from = `../pc/${name}/index`;
              return {
                name: componentName,
                from,
                // 导入 css
                sideEffects: sideEffects(`../pc/${name}`),
              };
            }
          },
        },
      ],
    }),
  ],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      strict: false,
    },
  },
  preview: {
    host: '0.0.0.0',
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: v3Token,
      },
    },
  },
});
