import prompts from 'prompts';
import lodash from 'lodash';
import { checkName } from './utils';
import { pcPkgPath } from './constants';
import { genFile, updatePcEntry } from './logic';

async function init() {
  const response = await prompts({
    type: 'text',
    name: 'name',
    message: '请输入要创建的组件名称（不用带前缀）?',
    validate: value => checkName(value),
  });

  const name = response.name;
  if (!name) return;
  const pascalName = lodash.upperFirst(lodash.camelCase(name));
  const prefixPascalName = `Gupo${pascalName}`;
  const prefixKebabName = `gupo-${name}`;
  genFile(name, prefixKebabName, prefixPascalName, pascalName, pcPkgPath);
  updatePcEntry(name, prefixPascalName, pcPkgPath);
}

init();
