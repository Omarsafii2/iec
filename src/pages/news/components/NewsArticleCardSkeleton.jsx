/** Skeleton matching `Card` variant `newsArticle`. */
export function NewsArticleCardSkeleton() {
  return (
    <div
      className="iec-card iec-card--news-article flex h-full animate-pulse flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
      aria-hidden
    >
      <div className="iec-card__figure iec-card__figure--news h-64 w-full bg-gray-200" />
      <div className="iec-card__body iec-card__body--news flex flex-1 flex-col p-8">
        <div className="mb-4 h-3 w-28 rounded bg-gray-200" />
        <div className="mb-4 h-6 w-3/4 rounded bg-gray-200" />
        <div className="mb-2 h-4 w-full rounded bg-gray-100" />
        <div className="mb-2 h-4 w-5/6 rounded bg-gray-100" />
        <div className="mb-8 h-4 w-4/5 rounded bg-gray-100" />
        <div className="iec-card__footer mt-auto border-t border-gray-100 pt-6">
          <div className="h-4 w-28 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function NewsFeedGridSkeleton({ count = 4 }) {
  return (
    <div
      className="iec-news-list container mx-auto px-4 py-20"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">جاري تحميل المحتوى...</span>
      <div className="iec-news-list__grid grid gap-8 md:grid-cols-2">
        {Array.from({ length: count }, (_, i) => (
          <NewsArticleCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
