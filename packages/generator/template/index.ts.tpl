import <%= pascalName %> from './src/<%= name %>.vue';
import { withInstall } from '@gupo/common';

export const <%= prefixPascalName %> = withInstall(<%= pascalName %>);
export default <%= prefixPascalName %>;
