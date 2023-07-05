import lodash from 'lodash';
import { checkName } from './utils';
import { pcPkgPath } from './constants';
import { genFile, updatePcEntry } from './logic';
import inquirer from 'inquirer';

export async function createPcComp() {
  const response = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: '请输入要创建的组件名称（不用带前缀）?',
    validate: value => checkName(pcPkgPath, value),
  });

  const name = response.name;
  if (!name) return;
  const pascalName = lodash.upperFirst(lodash.camelCase(name));
  const prefixPascalName = `Gupo${pascalName}`;
  const prefixKebabName = `gupo-${name}`;
  genFile(name, prefixKebabName, prefixPascalName, pascalName, pcPkgPath);
  updatePcEntry(name, prefixPascalName, pcPkgPath);
}
