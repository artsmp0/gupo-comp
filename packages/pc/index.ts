import { App } from 'vue';
import GupoTime from './time';
import GupoEllipsis from './ellipsis';

const components = [GupoTime, GupoEllipsis];
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
