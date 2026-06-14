import NewsFeedListPage from './NewsFeedListPage.jsx';

/** @deprecated Use /news/activities — kept for backward-compatible links. */
export default function NewsListPage() {
  return <NewsFeedListPage feedKey="activities" />;
}
