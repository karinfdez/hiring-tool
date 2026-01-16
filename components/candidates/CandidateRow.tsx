import { Candidate } from '@/app/lib/types';
import { Badge } from '@/components/ui/badge';

type CandidateRowProps = {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

const getStageColor = (stage: string) => {
  switch (stage) {
    case 'Applied': return 'bg-blue-100 text-blue-800';
    case 'Screening': return 'bg-yellow-100 text-yellow-800';
    case 'Interview': return 'bg-purple-100 text-purple-800';
    case 'Offer': return 'bg-green-100 text-green-800';
    case 'Hired': return 'bg-emerald-100 text-emerald-800';
    case 'Rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function CandidateRow({
  candidate,
  isSelected,
  onSelect,
}: CandidateRowProps) {
  return (
    <div
      onClick={() => onSelect(candidate.id)}
      className={`border-b border-gray-100 p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
        isSelected ? 'bg-blue-50 border-blue-200' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="font-semibold text-gray-900 mb-1">{candidate.name}</div>
          <div className="text-sm text-gray-600">{candidate.role}</div>
        </div>
        <Badge className={`${getStageColor(candidate.stage)} border-0 font-medium`}>
          {candidate.stage}
        </Badge>
      </div>
    </div>
  );
}
