import path from 'path';
import fs from 'fs-extra';
import lodash from 'lodash';
import { files } from './utils';

/** 生成文件 */
export function genFile(
  name: string,
  prefixKebabName: string,
  prefixPascalName: string,
  pascalName: string,
  finalPath: string
) {
  files.forEach(async f => {
    const tplPath = path.resolve(__dirname, `./template/${f.tpl}`);
    let data = await fs.readFile(tplPath, 'utf-8');

    const compiled = lodash.template(data);
    data = compiled({
      name,
      prefixPascalName,
      prefixKebabName,
      pascalName,
    });

    const outputPath = path.resolve(finalPath, `${name}/${f.file.replace('{name}', name)}`);
    await fs.outputFile(outputPath, data);

    console.log(`已创建：${outputPath}`);
  });
}

export async function updatePcEntry(
  name: string,
  prefixPascalName: string,
  componentPkgPath: string
) {
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
