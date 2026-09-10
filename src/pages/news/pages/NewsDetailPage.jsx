import NewsFeedDetailPage from './NewsFeedDetailPage.jsx';

/** @deprecated Use /news/activities/:articleId — kept for backward-compatible links. */
export default function NewsDetailPage() {
  return <NewsFeedDetailPage feedKey="activities" />;
} 