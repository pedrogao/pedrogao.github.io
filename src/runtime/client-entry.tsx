import { createRoot } from 'react-dom/client';
import { App } from './App';
import siteData from 'island:site-data';

console.log(siteData);

function renderInBrowser() {
  const root = document.getElementById('root');
  createRoot(root).render(<App />);
}

renderInBrowser();
