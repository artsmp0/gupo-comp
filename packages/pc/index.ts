import { App } from 'vue';
import GupoTime from './time';

const components = [GupoTime];
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
