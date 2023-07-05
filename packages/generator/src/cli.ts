import { program } from 'commander';
import { createPcComp } from './pc';
import { createMobileComp } from './mobile';
import { consola } from 'consola';

// cli版本
program.version(require('../package').version, '-v, --version', 'cli的最新版本');

// 创建文件命令行
program
  .command('new <type>')
  .description('type: pc or mobile, 表示要创建的组件类型')
  .action(type => {
    console.log(type);
    if (type === 'pc') {
      createPcComp();
    } else if (type === 'mobile') {
      createMobileComp();
    } else {
      consola.error('当前仅支持创建『pc』或者『mobile』两种组件！');
    }
  });

// 处理命令行输入的参数
program.parse(process.argv);
