import { App } from 'vue';
 import GupoSearchBar from './search-bar';
import GupoTable from './table';

const components: any[] = [GupoTable, GupoSearchBar];
export { 
GupoSearchBar, GupoTable };
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
