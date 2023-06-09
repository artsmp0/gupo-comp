import inquirer from 'inquirer';
import lodash from 'lodash';
import { checkName } from './utils';
import { mobilePkgPath } from './constants';
import { genFile, updatePcEntry } from './logic';

async function init() {
  const response = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: '请输入要创建的组件名称（不用带前缀）?',
    validate: value => checkName(mobilePkgPath, value),
  });

  const name = response.name;
  if (!name) return;
  const pascalName = lodash.upperFirst(lodash.camelCase(name));
  const prefixPascalName = `Gupo${pascalName}`;
  const prefixKebabName = `gupo-${name}`;
  genFile(name, prefixKebabName, prefixPascalName, pascalName, mobilePkgPath);
  updatePcEntry(name, prefixPascalName, mobilePkgPath);
}

init();
