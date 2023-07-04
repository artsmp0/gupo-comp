import { App } from 'vue';
import GupoHelpMessage from './help-message';
import GupoTable from './table';
import GupoTime from './time';
import GupoEllipsis from './ellipsis';

const components: any[] = [GupoTime, GupoEllipsis, GupoTable, GupoHelpMessage];
export { GupoHelpMessage, GupoTable, GupoTime, GupoEllipsis };
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
