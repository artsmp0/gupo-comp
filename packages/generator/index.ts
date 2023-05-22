import path from 'path';
import fs from 'fs-extra';
import prompts from 'prompts';
import lodash from 'lodash';
import { checkName, files } from './utils';
import { componentPkgPath } from './constants';

init();

async function init() {
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
  genFile(name, prefixKebabName, prefixPascalName);
  updatePcEntry(name, prefixKebabName, prefixPascalName);
}

/** 生成文件 */
function genFile(name: string, prefixKebabName: string, prefixPascalName: string) {
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
}

async function updatePcEntry(name: string, prefixKebabName: string, prefixPascalName: string) {
  // 新增了一个组件，我们需要更新 index.ts 文件中的内容
  const entryPath = path.resolve(componentPkgPath, './index.ts');
  // 读取这个文件中的内容并新增一些内容表示添加新组件
  let data = await fs.readFile(entryPath, 'utf-8');
  data = data.replace(
    `import { App } from 'vue';`,
    `import { App } from 'vue';\n import ${prefixPascalName} from './${name}';`
  );
  data = data.replace('];', `, ${prefixPascalName}];`);
  data = data.replace('export {', `export { \n${prefixPascalName},`);
  fs.writeFile(entryPath, data);
}
