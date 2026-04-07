import { InnerPageHero } from '../../../../components/common/InnerPageHero.jsx';
import { BoardMembersSection } from '../../components/administrative-board/BoardMembersSection.jsx';

/** أعضاء مجلس الإدارة */
export default function BoardMembersPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="أعضاء مجلس الإدارة"
        breadcrumbs={[
          { label: 'من نحن', href: '/#about' },
          { label: 'الهيئة الإدارية', href: '/about/board-members' },
          { label: 'أعضاء مجلس الإدارة' },
        ]}
      />
      <BoardMembersSection />
    </main>
  );
}
