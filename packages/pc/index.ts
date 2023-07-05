import { App } from 'vue';

const components: any[] = [];
export {};
export default {
  install(app: App) {
    components.forEach(comp => {
      if (comp.install) {
        app.use(comp);
      } else if (comp.name) {
        app.component(comp.name, comp);
      }
    });
  },
};
