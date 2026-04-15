import { useState } from 'react';
import {
  UserPlus,
  CreditCard,
  FileText,
  CircleHelp,
  Calendar,
  MapPin,
} from 'lucide-react';
import Card from '../../../components/ui/Card.jsx';

const FAQ_ITEMS = [
  {
    id: 'join',
    title: 'كيف يمكنني الانضمام إلى نادي خريجي الكلية العلمية الإسلامية؟',
    description:
      'يمكنك التقدم بطلب الانتساب من خلال صفحة طلب الانتساب على الموقع، ثم تعبئة النموذج وإرفاق البيانات المطلوبة ليتم مراجعتها وفق شروط العضوية المعتمدة.',
    icon: <UserPlus size={20} strokeWidth={2} aria-hidden />,
  },
  {
    id: 'fees',
    title: 'ما هي رسوم العضوية؟',
    description:
      'تبلغ رسوم الانتساب 15 دينارًا، بينما تبلغ رسوم الاشتراك السنوي 24 دينارًا، وذلك وفق النظام المالي المعتمد للنادي.',
    icon: <CreditCard size={20} strokeWidth={2} aria-hidden />,
  },
  {
    id: 'documents',
    title: 'ما هي المستندات المطلوبة للعضوية؟',
    description:
      'يعتمد ذلك على حالة الطلب، لكن غالبًا ما يتم طلب بيانات الهوية ومعلومات التواصل وما يثبت الدراسة أو التخرج من مدارس الكلية العلمية الإسلامية عند الحاجة.',
    icon: <FileText size={20} strokeWidth={2} aria-hidden />,
  },
  {
    id: 'facilities',
    title: 'هل يمكن لغير الخريجين الاستفادة من مرافق النادي؟',
    description:
      'تتوفر بعض الخدمات والمرافق وفق الأنظمة والتعليمات المعمول بها في النادي، لذلك يُنصح بالتواصل المباشر مع الإدارة لمعرفة نوع الخدمة وإمكانية الاستفادة منها.',
    icon: <CircleHelp size={20} strokeWidth={2} aria-hidden />,
  },
  {
    id: 'booking',
    title: 'كيف يمكنني حجز قاعات النادي للمناسبات؟',
    description:
      'يمكن تقديم طلب حجز من خلال صفحة حجز القاعات أو عبر التواصل مع إدارة النادي، وسيتم تزويدك بالتفاصيل المتاحة حول المواعيد والشروط والرسوم.',
    icon: <Calendar size={20} strokeWidth={2} aria-hidden />,
  },
  {
    id: 'location',
    title: 'أين يقع مقر النادي وما هي ساعات العمل؟',
    description:
      'يقع النادي في عمان، الأردن - الجبيهة، وتكون ساعات العمل اليومية من الساعة 9:00 صباحًا حتى 5:00 مساءً، باستثناء يوم الجمعة والعطل الرسمية.',
    icon: <MapPin size={20} strokeWidth={2} aria-hidden />,
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center" data-aos="fade-up">
          <h2 className="mb-4 text-3xl font-bold text-[#564636]">كيف يمكننا مساعدتك؟</h2>
          <p className="text-gray-600">ستجد هنا إجابات لأكثر الأسئلة شيوعاً حول العضوية، الخدمات، والأنشطة.</p>
        </div>

        <div
          className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
          data-aos="fade-up"
        >
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <Card
                key={item.id}
                variant="faq-item"
                {...item}
                open={openId === item.id}
                onToggle={() => setOpenId((currentId) => (currentId === item.id ? null : item.id))}
              />
            ))}
          </div>
        </div>

        <Card
          variant="faq-cta"
          className="mt-12"
          title="لم تجد إجابة لسؤالك؟"
          description="فريقنا جاهز للإجابة على جميع استفساراتكم"
          to="/contact"
          ctaLabel="تواصل معنا"
        />
      </div>
    </div>
  );
}
