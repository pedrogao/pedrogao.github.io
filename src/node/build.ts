import fs from 'fs-extra';
import ora from 'ora';
import { join } from 'path';
import { build as viteBuild, InlineConfig } from 'vite';
import type { RollupOutput } from 'rollup';
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants';
import pluginReact from '@vitejs/plugin-react';
// import { pathToFileURL } from "url";

export async function build(root: string = process.cwd()) {
  const [clientBundle] = await bundle(root);
  // 引入 ssr 入口模块
  const serverEntryPath = join(root, '.temp', 'ssr-entry.js');
  const { render } = await import(serverEntryPath);
  // const { render } = (await import(pathToFileURL(serverEntryPath).pathname));
  await renderPage(render, root, clientBundle);
}

export async function bundle(root: string) {
  const resolveViteConfig = (isServer: boolean) => ({
    mode: 'production',
    root,
    // 注意加上这个插件，自动注入 import React from 'react'，避免 React is not defined 的错误
    plugin: [pluginReact()],
    build: {
      ssr: isServer,
      outDir: isServer ? '.temp' : 'build',
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? 'cjs' : 'esm'
        }
      }
    }
  });

  const spinner = ora().start();
  spinner.info('Building client + server bundles...');

  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      viteBuild(resolveViteConfig(false) as InlineConfig),
      // server build
      viteBuild(resolveViteConfig(true) as InlineConfig)
    ]);
    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (e) {
    console.log(e);
  }
}

export async function renderPage(
  render: () => string,
  root: string,
  clientBundle: RollupOutput
) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );
  console.log('Rendering page in server side...');
  const appHtml = render();
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>title</title>
    <meta name="description" content="xxx">
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="/${clientChunk?.fileName}"></script>
  </body>
</html>`.trim();
  await fs.ensureDir(join(root, 'build'));
  await fs.writeFile(join(root, 'build/index.html'), html);
  await fs.remove(join(root, '.temp')); // remove temp ssr entry files
}
