import Card from '../../../components/ui/Card.jsx';

function SectionTitle({ children, id }) {
  return (
    <h3
      id={id}
      className="iec-academy-detail__section-title relative mb-8 inline-block text-2xl font-bold text-[#564636]"
    >
      {children}
      <span
        className="iec-academy-detail__section-rule absolute -bottom-2 end-0 h-1 w-1/2 rounded-full bg-[#897D56]"
        aria-hidden
      />
    </h3>
  );
}

/** صفحة تفاصيل أكاديمية / شبكة */
export function AcademyDetailContent({ academy }) {
  return (
    <div className="iec-academy-detail container mx-auto px-4 py-16">
      <div
        className="iec-academy-detail__intro mb-12 flex flex-col items-center gap-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:flex-row"
        data-aos="fade-up"
      >
        <div className="iec-academy-detail__intro-media w-full md:w-1/3">
          <div className="iec-academy-detail__intro-frame group flex items-center justify-center rounded-2xl bg-gray-50 p-8">
            <div className="iec-academy-detail__intro-figure iec-card__figure relative flex h-32 w-32 items-center justify-center">
              <img
                src={academy.image}
                alt={academy.title}
                className="iec-academy-detail__intro-img iec-card__figure-img h-full w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
        <div className="iec-academy-detail__intro-text w-full md:w-2/3">
          <h2 className="iec-academy-detail__intro-title mb-4 text-3xl font-bold text-[#564636]">
            {academy.title}
          </h2>
          <p className="iec-academy-detail__intro-desc text-lg leading-relaxed text-gray-600">
            {academy.description}
          </p>
        </div>
      </div>

      <section className="iec-academy-detail__activities mb-16" aria-labelledby="academy-activities-heading">
        <div className="iec-academy-detail__activities-header mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <SectionTitle id="academy-activities-heading">الدورات والأنشطة</SectionTitle>
        </div>
        <div
          className="iec-academy-detail__activities-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          data-aos="fade-up"
        >
          {(academy.activities || []).map((act, i) => (
            <Card
              key={`${act.title}-${i}`}
              variant="academyActivity"
              date={act.date}
              title={act.title}
              location={act.location}
              phone={act.phone || academy.contactPhone}
            />
          ))}
        </div>
      </section>

      <section className="iec-academy-detail__partners mb-16" aria-labelledby="academy-partners-heading">
        <SectionTitle id="academy-partners-heading">شركاؤنا</SectionTitle>
        <div
          className="iec-academy-detail__partners-box rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
          data-aos="fade-up"
        >
          <div className="iec-academy-detail__partners-logos flex flex-wrap items-center justify-center gap-12">
            {(academy.partners || []).map((p, i) => (
              <Card key={`${p.src}-${i}`} variant="academyPartnerLogo" src={p.src} alt={p.alt} />
            ))}
          </div>
        </div>
      </section>

      <section className="iec-academy-detail__bulletin mb-16" aria-labelledby="academy-bulletin-heading">
        <SectionTitle id="academy-bulletin-heading">النشرة الإخبارية</SectionTitle>
        <div className="iec-academy-detail__bulletin-grid grid gap-6 md:grid-cols-2" data-aos="fade-up">
          {(academy.newsItems || []).map((item, i) => (
            <Card
              key={`${item.to}-${i}`}
              variant="academyNewsBrief"
              day={item.day}
              monthYear={item.monthYear}
              title={item.title}
              excerpt={item.excerpt}
              readMoreTo={item.to}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
