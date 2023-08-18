import { cac } from 'cac';
import * as path from 'path';
import { createDevServer } from './dev';
import { build } from './build';

const version = '0.0.1';
const cli = cac('island').version(version).help();

cli
  .command('[root]', 'start dev server')
  .alias('dev')
  .action(async (root: string) => {
    root = root ? path.resolve(root) : process.cwd();
    const server = await createDevServer(root);
    await server.listen();
    server.printUrls();
  });

cli
  .command('build [root]', 'build for production')
  .action(async (root: string) => {
    try {
      root = path.resolve(root);
      await build(root);
    } catch (e) {
      console.log(e);
    }
  });

cli.parse();
