/**
 * Shared Page Hero component for all content pages.
 * Use title (string) for simple one-line titles, or titleNode for custom markup.
 */
const PageHero = ({ title, titleNode, subtitle }) => (
  <section className="page-hero">
    <div className="page-hero__inner">
      <h1 className="page-hero__title">
        {titleNode ?? title}
      </h1>
      {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
    </div>
  </section>
);

export default PageHero;
