import { Nav } from '../components/Nav';
import { HomeLayout } from './HomeLayout';
import { DocLayout } from './DocLayout';
import { usePageData } from '../../runtime';
import { Helmet } from 'react-helmet-async';
import { NotFoundLayout } from './NotFoundLayout';
import 'uno.css';
import '../styles/base.css';
import '../styles/vars.css';
import '../styles/doc.css';

export function Layout() {
  const pageData = usePageData();
  const { pageType, title } = pageData;
  const getContent = () => {
    if (pageType === 'home') {
      return <HomeLayout />;
    } else if (pageType === 'doc') {
      return <DocLayout />;
    } else {
      return <NotFoundLayout />;
    }
  };
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Nav />
      <section
        style={{
          paddingTop: 'var(--island-nav-height)'
        }}
      >
        {getContent()}
      </section>
    </div>
  );
}
