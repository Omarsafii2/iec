import Card from '../../../../components/ui/Card.jsx';
import { BOARD_MEMBERS } from './boardMembersData.js';

/** شبكة بطاقات أعضاء مجلس الإدارة */
export function BoardMembersSection({ members = BOARD_MEMBERS }) {
  return (
    <div className="container mx-auto px-4 py-20">
      <div
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        data-aos="fade-up"
      >
        {members.map((member) => (
          <Card key={member.name} variant="board-members" {...member} />
        ))}
      </div>
    </div>
  );
}
