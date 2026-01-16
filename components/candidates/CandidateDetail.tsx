import { Candidate } from '@/app/lib/types';

type CandidateDetailProps = {
  candidate: Candidate | null;
};

export function CandidateDetail({ candidate }: CandidateDetailProps) {
  if (!candidate) {
    return (
      <div className="p-4 text-gray-500">
        Select a candidate to see details
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{candidate.name}</h2>
        <p className="text-sm text-gray-600">{candidate.role}</p>
      </div>

      <div>
        <h3 className="font-medium">Current Stage</h3>
        <p className="text-sm">{candidate.stage}</p>
      </div>

      <div>
        <h3 className="font-medium">Activity Timeline</h3>
        <ul className="space-y-2">
          {candidate.activities.map(activity => (
            <li key={activity.id} className="text-sm text-gray-700">
              {activity.from} → {activity.to}{' '}
              <span className="text-gray-400">
                ({new Date(activity.timestamp).toLocaleString()})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
