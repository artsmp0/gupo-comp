import path from 'path';
import fs from 'fs-extra';

/** 验证组件名称 */
export function checkComponentName(name: string) {
  return /^[a-z][a-z|-]*[a-z]$/.test(name);
}

/** 验证是否已经存在该组件 */
export function checkName(p: string, name: string) {
  return checkComponentName(name)
    ? fs.existsSync(path.resolve(p, name))
      ? `组件库中已经存在名为『${name}』的组件`
      : true
    : '组件名称请使用 kebab-case 方式命名！';
}

export const files = [
  {
    file: 'index.ts',
    tpl: 'index.ts.tpl',
  },
  {
    file: 'src/{name}.vue',
    tpl: 'src.{name}.vue.tpl',
  },
  {
    file: 'src/{name}.ts',
    tpl: 'src.{name}.ts.tpl',
  },
  {
    file: 'style/index.less',
    tpl: 'style.index.less.tpl',
  },
  {
    file: 'style/index.ts',
    tpl: 'style.index.ts.tpl',
  },
];
