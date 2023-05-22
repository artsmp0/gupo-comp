import path from 'path';
import fs from 'fs-extra';
import prompts from 'prompts';
import lodash from 'lodash';
import { checkName, files } from './utils';
import { componentPkgPath } from './constants';

(async () => {
  const response = await prompts({
    type: 'text',
    name: 'name',
    message: '请输入要创建的组件名称（不用带前缀）?',
    validate: value => checkName(value),
  });

  const name = response.name;
  if (!name) return;

  const prefixPascalName = `Gupo${lodash.upperFirst(lodash.camelCase(name))}`;
  const prefixKebabName = `gupo-${name}`;
  files.forEach(async f => {
    const tplPath = path.resolve(__dirname, `./template/${f.tpl}`);
    let data = await fs.readFile(tplPath, 'utf-8');

    const compiled = lodash.template(data);
    data = compiled({
      name,
      prefixPascalName,
      prefixKebabName,
    });

    const outputPath = path.resolve(componentPkgPath, `${name}/${f.file.replace('{name}', name)}`);
    await fs.outputFile(outputPath, data);

    console.log(`已创建：${outputPath}`);
  });
})();
