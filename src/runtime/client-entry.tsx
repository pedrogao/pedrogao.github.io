import { createRoot } from 'react-dom/client';
import { App } from './app';
import { BrowserRouter } from 'react-router-dom';

function renderInBrowser() {
  const root = document.getElementById('root');
  createRoot(root).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

renderInBrowser();
