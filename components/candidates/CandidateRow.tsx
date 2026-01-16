import { Candidate } from '@/app/lib/types';

type CandidateRowProps = {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export function CandidateRow({
  candidate,
  isSelected,
  onSelect,
}: CandidateRowProps) {
  return (
    <div
      onClick={() => onSelect(candidate.id)}
      className={`border-b p-3 cursor-pointer ${
        isSelected ? 'bg-gray-100' : ''
      }`}
    >
      <div className="font-medium">{candidate.name}</div>
      <div className="text-sm text-gray-600">
        {candidate.role} · {candidate.stage}
      </div>
    </div>
  );
}
