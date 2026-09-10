import { Navigate } from 'react-router-dom';
import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { NewsFeedSection } from '../components/NewsFeedSection.jsx';
import { getNewsFeedConfig } from '../lib/newsFeedConfig.js';

export default function NewsFeedListPage({ feedKey }) {
  const config = getNewsFeedConfig(feedKey);

  if (!config) return <Navigate to="/" replace />;

  return (
    <main className={`iec-page iec-page--news-${feedKey} min-h-screen bg-gray-50 pt-[140px]`}>
      <InnerPageHero
        title={config.title}
        breadcrumbs={[
          { label: 'النشرة الإخبارية', href: '/#news' },
          { label: config.title },
        ]}
      />
      <NewsFeedSection key={feedKey} feedKey={feedKey} />
    </main>
  );
}
