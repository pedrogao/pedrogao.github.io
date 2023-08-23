import { createServer } from 'vite';
import pluginReact from '@vitejs/plugin-react';
import { pluginIndexHtml } from './plugin-island/indexHtml';
import { pluginConfig } from './plugin-island/config';
import { pluginRoutes } from './plugin-routes';
import { resolveConfig } from './config';
import { PACKAGE_ROOT } from './constants';

export async function createDevServer(
  root: string,
  restartServer: () => Promise<void>
) {
  const config = await resolveConfig(root, 'serve', 'development');
  return createServer({
    plugins: [
      pluginIndexHtml(),
      pluginReact({ jsxRuntime: 'automatic' }),
      pluginConfig(config, restartServer),
      pluginRoutes({ root: config.root })
    ],
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
