import fs from 'fs-extra';
import path from 'path';
import { loadConfigFromFile } from 'vite';
import { UserConfig, SiteConfig } from 'shared/types';

type RawConfig =
  | UserConfig
  | Promise<UserConfig>
  | (() => UserConfig | Promise<UserConfig>);

export function resolveSiteData(userConfig: UserConfig): UserConfig {
  return {
    title: userConfig.title || 'Island.js',
    description: userConfig.description || 'SSG Framework',
    themeConfig: userConfig.themeConfig || {},
    vite: userConfig.vite || {}
  };
}

export async function resolveUserConfig(
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production'
) {
  const configPath = getUserConfigPath(root);
  const result = await loadConfigFromFile({ mode, command }, configPath, root);

  if (result) {
    const { config: rawConfig = {} as RawConfig } = result;
    const userConfig = await (typeof rawConfig === 'function'
      ? rawConfig()
      : rawConfig);

    return [configPath, userConfig] as const;
  } else {
    return [configPath, {} as UserConfig] as const;
  }
}

export async function resolveConfig(
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production'
) {
  const [configPath, userConfig] = await resolveUserConfig(root, command, mode);

  const siteConfig: SiteConfig = {
    root,
    configPath: configPath,
    siteData: resolveSiteData(userConfig as UserConfig)
  };
  return siteConfig;
}

function getUserConfigPath(root: string) {
  try {
    const supportedConfigFiles = ['config.ts', 'config.js'];
    const configPath = supportedConfigFiles
      .map((file) => {
        return path.resolve(root, file);
      })
      .find(fs.pathExistsSync);
    return configPath;
  } catch (e) {
    console.error(`Failed to resolve config file in ${root} ${e}`);
    throw e;
  }
}

export function defineConfig(config: UserConfig) {
  return config;
}
