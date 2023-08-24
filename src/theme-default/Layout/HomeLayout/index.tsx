import { usePageData } from '../../../runtime';
import { HomeHero } from '../../components/HomeHero';
import { HomeFeature } from '../../components/HomeFeature';

export function HomeLayout() {
  const { frontmatter } = usePageData();
  return (
    <div>
      <HomeHero hero={frontmatter.hero} />
      <HomeFeature features={frontmatter.features} />
    </div>
  );
}
