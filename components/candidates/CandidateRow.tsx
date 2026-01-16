import { Candidate } from '@/app//lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Props = {
  candidate: Candidate;
  onSelect: (id: string) => void;
  selected?: boolean;
};

export function CandidateRow({
  candidate,
  onSelect,
  selected,
}: Props) {
  return (
    <Card
      onClick={() => onSelect(candidate.id)}
      className={`cursor-pointer transition ${
        selected ? 'border-primary' : ''
      }`}
    >
      <CardContent className="p-3 flex justify-between items-center">
        <div>
          <div className="font-medium">{candidate.name}</div>
          <div className="text-sm text-muted-foreground">
            {candidate.role}
          </div>
        </div>

        <Badge variant="secondary">
          {candidate.stage}
        </Badge>
      </CardContent>
    </Card>
  );
}