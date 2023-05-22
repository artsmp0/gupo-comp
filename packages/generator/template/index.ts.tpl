import <%= name %> from './src/<%= name %>.vue';
import { withInstall } from '@gupo/common';

export const <%= prefixPascalName %> = withInstall(<%= name %>);
export default <%= prefixPascalName %>;
