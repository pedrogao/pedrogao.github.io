import { App } from './app';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

export function render() {
  return renderToString(
    <StaticRouter location={'/guide'}>
      <App />
    </StaticRouter>
  );
}

// 导出路由数据
export { routes } from 'island:routes';
