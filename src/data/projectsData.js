export const PROJECTS_DATA = [
    { id: 1, title: 'برنامج تحسين جودة المنتجات الزراعية', funder: 'السفارة الهولندية - الأردن', description: 'مشروع لتحسين جودة المنتجات الزراعية وزيادة القدرة التنافسية في الأسواق الدولية', country: 'الأردن', countryId: 'jordan', topics: ['تحسين ما بعد الحصاد', 'التصدير'], funderId: 'netherlands', image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=500&q=80' },
    { id: 2, title: 'مشروع تطوير البيوت البلاستيكية الحديثة', funder: 'EBRD', description: 'التطوير تقنيات البيوت البلاستيكية الحديثة لزيادة الإنتاجية', country: 'الأردن', countryId: 'jordan', topics: ['البيوت البلاستيكية', 'تحسين ما قبل الحصاد'], funderId: 'ebrd', image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=500&q=80' },
    { id: 3, title: 'برنامج إدارة المياه المستدامة', funder: 'غدير - برنامج المسؤولية الاجتماعية لشركة نستله للمياه', description: 'تحسين أنظمة الري وإدارة المياه للحفاظ على الموارد المالية', country: 'الأردن', countryId: 'jordan', topics: ['المياه', 'تحسين ما قبل الحصاد'], funderId: 'nestle', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80' },
    { id: 4, title: 'مشروع التوظيف الزراعي في الريف', funder: 'السفارة الهولندية - الأردن', description: 'تعزيز فرص العمل في القطاع الزراعي في المناطق الريفية', country: 'الأردن', countryId: 'jordan', topics: ['التوظيف', 'تحسين ما بعد الحصاد'], funderId: 'netherlands', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80' },
    { id: 5, title: 'برنامج المياه والري الذكي', funder: 'GIZ', description: 'استخدام تقنيات الري الذكية لترشيد استهلاك المياه', country: 'الأردن', countryId: 'jordan', topics: ['المياه', 'التوظيف'], funderId: 'giz', image: 'https://images.unsplash.com/photo-1568584711271-dec4c035f781?w=500&q=80' },
    { id: 6, title: 'مشروع التصدير والوصول للأسواق', funder: 'ENI', description: 'دعم المزارعين للوصول إلى أسواق التصدير الإقليمية', country: 'الأردن', countryId: 'jordan', topics: ['التصدير', 'تحسين ما بعد الحصاد'], funderId: 'eni', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&q=80' },
    { id: 7, title: 'مشروع البيوت البلاستيكية والطاقة', funder: 'السفارة الهولندية - الأردن', description: 'دمج تقنيات الطاقة المتجددة مع البيوت البلاستيكية', country: 'الأردن', countryId: 'jordan', topics: ['البيوت البلاستيكية', 'المياه'], funderId: 'netherlands', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80' },
    { id: 8, title: 'برنامج تحسين ما بعد الحصاد', funder: 'EBRD', description: 'تقليل الفاقد وتحسين الجودة بعد الحصاد', country: 'الأردن', countryId: 'jordan', topics: ['تحسين ما بعد الحصاد'], funderId: 'ebrd', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80' },
    { id: 9, title: 'مشروع المياه الجوفية', funder: 'GIZ', description: 'إدارة مستدامة للمياه الجوفية في المناطق الزراعية', country: 'الأردن', countryId: 'jordan', topics: ['المياه'], funderId: 'giz', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80' },
    { id: 10, title: 'مشروع التوظيف الأخضر', funder: 'ENI', description: 'خلق فرص عمل في الزراعة المستدامة', country: 'الأردن', countryId: 'jordan', topics: ['التوظيف'], funderId: 'eni', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a9?w=500&q=80' }
];

export const COUNTRIES = [
    { id: '', label: 'جميع الدول' },
    { id: 'jordan', label: 'الأردن' }
];

export const TOPICS_WITH_IDS = [
    { id: 'employment', label: 'التوظيف' },
    { id: 'post-harvest', label: 'تحسين ما بعد الحصاد' },
    { id: 'water', label: 'المياه' },
    { id: 'plastic-houses', label: 'البيوت البلاستيكية' },
    { id: 'pre-harvest', label: 'تحسين ما قبل الحصاد' },
    { id: 'export', label: 'التصدير' }
];

export const FUNDERS = [
    { id: 'netherlands', label: 'السفارة الهولندية - الأردن' },
    { id: 'ebrd', label: 'EBRD' },
    { id: 'giz', label: 'GIZ' },
    { id: 'eni', label: 'ENI' },
    { id: 'nestle', label: 'غدير - برنامج المسؤولية الاجتماعية لشركة نستله للمياه' }
];

export const getProjectById = (id) => {
    const numId = typeof id === 'string' ? parseInt(id, 10) : id;
    return PROJECTS_DATA.find((p) => p.id === numId);
};

/** محتوى افتراضي لأقسام صفحة تفاصيل المشروع (يمكن تخصيصه لكل مشروع لاحقاً) */
export const DEFAULT_PROJECT_DETAIL = {
    introduction: 'هل أنت رائد أعمال في سلسلة الزراعة في الأردن؟ إذا نعم، يقدم FCA فرصا جيدة لإنشاء مشاريعك الخاصة أو توسيع مشاريعك الحالية.',
    partnersIntro: 'يمول المشروع السفارة الهولندية في الأردن، وينفذه Finn Church Aid (FCA) أكبر منظمة تعاون فنلندية وثاني أكبر مقدم للمساعدات الإنسانية. تعمل FCA مع العديد من الدول وتقدم المساعدة للناس لتوفير مصدر دخل، بالتعاون مع الجمعية الأردنية للمهندسين الزراعيين.',
    partnerImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
    benefitsSummary: 'يهدف المشروع لجذب المزيد من الشباب للقطاع الزراعي من خلال عروض أكثر جاذبية عبر دمج التكنولوجيا والابتكار وريادة الأعمال والشركات الناشئة والتدريب العملي والدعم الفني. يدعم المشروع المزارعين والمشاريع التعاونية بوسائل البنية التحتية والتدريب والتقنيات الحديثة لزيادة الإنتاجية وخلق فرص عمل جديدة للشباب، مع التركيز على دمج النساء في القطاع وتحسين ظروف العمل.',
    duration: 'مدة البرنامج: 36 شهرًا (2022-2024)',
    detailsList: [
        'تحسين البنية التحتية والممارسات الزراعية قبل وبعد الحصاد.',
        'تقديم سلسلة تدريبية تقنية مبتكرة للشباب في قطاع الزراعة.',
        'دعم البحث التطبيقي من طلاب الجامعات عبر Dutch Youth Innovation Award (DYIA).',
        'تقديم رأس المال البذري لتأسيس أو توسيع المشاريع الصغيرة والمتوسطة للشباب.',
        'تعزيز الربط بين الشباب الماهر والقطاع الخاص وفرص العمل.',
        'تعزيز تبادل المعرفة مع مجتمع البستنة في الأردن.',
        'استهداف 1750 مزارعاً ومزارعة لتطوير مهاراتهم.'
    ],
    beneficiaryBenefits: [
        'التدريب التقني لما بعد الحصاد للشباب شبه الماهر وغير الماهر.',
        'توسيع الشركات الناشئة في قطاع الزراعة بمساعدات مالية تصل إلى 20,000 د.أ.',
        'المشاركة في DYIA للفوز بالمنح وبدء أعمالهم الخاصة.',
        'التدريب في ريادة الأعمال للمبتكرين وأصحاب الأفكار الزراعية.'
    ],
    commitment: 'لا يوجد أي التزام قبل الانضمام إلى برنامج COOL-YA.',
    whoCanApply: [
        'المزارعون وموظفو المشاريع التعاونية.',
        'رواد أعمال المشاريع الصغيرة والمتوسطة.',
        'الشباب شبه الماهر وغير الماهر بعد الحصاد.'
    ]
};
