import defaultImage from '../../../../assets/images/academies_img_1.svg';

const DEFAULT_PHONE = '0798477408';

const ARTS_CULTURE = {
  id: 'arts-culture',
  title: 'أكاديمية الفنون والثقافة',
  description:
    'تعزيز الجوانب الفنية والثقافية من خلال ورش عمل ومعارض فنية متنوعة.',
  image: defaultImage,
  contactPhone: DEFAULT_PHONE,
  activities: [
    {
      date: '15 آذار 2024',
      title: 'معرض الفنون التشكيلية السنوي',
      location: 'قاعة المعارض الرئيسية',
      phone: DEFAULT_PHONE,
    },
    {
      date: '22 آذار 2024',
      title: 'أمسية شعرية وثقافية',
      location: 'مسرح الكلية',
      phone: DEFAULT_PHONE,
    },
    {
      date: '10 نيسان 2024',
      title: 'ورشة النحت للمبتدئين',
      location: 'مشغل الفنون',
      phone: DEFAULT_PHONE,
    },
    {
      date: '18 أيار 2024',
      title: 'مهرجان الأفلام القصيرة',
      location: 'المسرح الخارجي',
      phone: DEFAULT_PHONE,
    },
  ],
  partners: [
    { src: '/logo.svg', alt: 'شريك' },
    { src: '/logo.svg', alt: 'شريك' },
    { src: '/logo.svg', alt: 'شريك' },
  ],
  newsItems: [
    {
      day: '1',
      monthYear: 'آذار 2024',
      title: 'افتتاح باب التسجيل لدورات الربيع',
      excerpt: 'نعلن عن بدء التسجيل في دورات الرسم والموسيقى للفصل القادم.',
      to: '/academies/arts-culture/news/news-1',
    },
    {
      day: '20',
      monthYear: 'شباط 2024',
      title: 'نجاح باهر للمعرض الشتوي',
      excerpt: 'شهد المعرض الشتوي حضوراً لافتاً من الخريجين والضيوف.',
      to: '/academies/arts-culture/news/news-2',
    },
    {
      day: '15',
      monthYear: 'شباط 2024',
      title: 'ورشة عمل مع الفنان العالمي سامي كريم',
      excerpt: 'استضافت الأكاديمية الفنان العالمي سامي كريم في ورشة عمل تفاعلية.',
      to: '/academies/arts-culture/news/news-3',
    },
    {
      day: '10',
      monthYear: 'شباط 2024',
      title: 'إطلاق نادي القراءة الشهري',
      excerpt: 'ندعوكم للانضمام إلى جلسات نادي القراءة لمناقشة أحدث الإصدارات الأدبية.',
      to: '/academies/arts-culture/news/news-4',
    },
  ],
};

function makeAcademy(id, title, description) {
  return {
    id,
    title,
    description,
    image: defaultImage,
    contactPhone: DEFAULT_PHONE,
    activities: [
      {
        date: '05 آذار 2025',
        title: `لقاء تعريفي — ${title}`,
        location: 'قاعة النادي الرئيسية',
        phone: DEFAULT_PHONE,
      },
      {
        date: '12 آذار 2025',
        title: 'ورشة عمل تفاعلية للأعضاء',
        location: 'مركز التدريب',
        phone: DEFAULT_PHONE,
      },
      {
        date: '20 آذار 2025',
        title: 'يوم مفتوح للخريجين',
        location: 'حديقة النادي',
        phone: DEFAULT_PHONE,
      },
    ],
    partners: [
      { src: '/logo.svg', alt: 'شريك' },
      { src: '/logo.svg', alt: 'شريك' },
    ],
    newsItems: [
      {
        day: '3',
        monthYear: 'آذار 2025',
        title: `تحديثات ${title}`,
        excerpt: 'آخر أخبار الأنشطة والبرامج القادمة.',
        to: `/academies/${id}/news/latest-1`,
      },
      {
        day: '25',
        monthYear: 'شباط 2025',
        title: 'تقرير نشاط الشهر',
        excerpt: 'اطلعوا على مجمل ما تم إنجازه خلال الشهر الماضي.',
        to: `/academies/${id}/news/latest-2`,
      },
    ],
  };
}

export const ACADEMIES = [
  ARTS_CULTURE,
  makeAcademy('sports', 'أكاديمية الرياضة', 'تنظيم الأنشطة الرياضية والبطولات وبناء فرق خريجية.'),
  makeAcademy('chess', 'أكاديمية الشطرنج', 'دورات تدريبية وبطولات شطرنج للمبتدئين والمحترفين.'),
  makeAcademy('development', 'أكاديمية التطوير', 'تطوير المهارات المهنية والشخصية للخريجين.'),
  makeAcademy(
    'tech-innovation',
    'أكاديمية التكنولوجيا والابتكار',
    'ورش تقنية، ريادة أعمال، وابتكار لخدمة المجتمع.',
  ),
  makeAcademy('health-life', 'شبكة الصحة والحياة', 'برامج توعية صحية وشراكات طبية لأعضاء النادي.'),
  makeAcademy('environment', 'شبكة البيئة', 'مبادرات بيئية وتثقيفية حول الاستدامة.'),
  makeAcademy('community-service', 'شبكة خدمة المجتمع', 'تنظيم حملات تطوعية ومبادرات خيرية.'),
  makeAcademy('youth-power', 'شبكة القوة الشبابية', 'تمكين الشباب وقيادة المشاريع المجتمعية.'),
  makeAcademy('golden-age', 'شبكة العمر الذهبي', 'أنشطة ثقافية واجتماعية لفئة الخريجين الأكبر سناً.'),
];

export function getAcademyById(id) {
  return ACADEMIES.find((a) => a.id === id);
}
