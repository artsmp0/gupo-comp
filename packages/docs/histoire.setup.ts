import { defineSetupVue3 } from '@histoire/plugin-vue';
import GupoPcComponent from '../pc';
import './main.css';

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(GupoPcComponent);
});
