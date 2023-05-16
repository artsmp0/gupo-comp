import { defaultColors, defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';

export default defineConfig({
  plugins: [HstVue()],
  setupFile: './histoire.setup.ts',
  theme: {
    title: '古珀组件库',
    // favicon: 'favicon.svg',
    logo: {
      // square: '/src/imgs/logo.png',
      // light: '/src/imgs/logo.png',
      // dark: '/src/imgs/logo.png',
    },
    colors: {
      primary: defaultColors.orange,
    },
    defaultColorScheme: 'light',
    hideColorSchemeSwitch: true,
    storeColorScheme: false,
  },
  vite: {
    server: {
      host: '0.0.0.0',
    },
  },
  tree: {
    groups: [
      {
        id: 'top',
        title: '',
      },
      {
        title: 'PC',
        include: file => {
          return file.path.includes('pc');
        },
      },
      {
        title: 'Mobile',
        include: file => {
          return file.path.includes('mobile');
        },
      },
    ],
  },
  defaultStoryProps: {
    icon: 'carbon:assembly-reference',
    // iconColor: '#00c5a5',
    responsiveDisabled: true,
    autoPropsDisabled: true,
  },
});
