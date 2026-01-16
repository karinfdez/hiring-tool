import { Candidate } from '@/app/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type CandidateDetailProps = {
  candidate: Candidate | null;
};

const getStageColor = (stage: string) => {
  switch (stage) {
    case 'Applied': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Screening': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Interview': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Offer': return 'bg-green-100 text-green-800 border-green-200';
    case 'Hired': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function CandidateDetail({ candidate }: CandidateDetailProps) {
  if (!candidate) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full p-8">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-4">👤</div>
            <p className="text-lg">Select a candidate to see details</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="text-center space-y-4 max-w-md w-full">
          <div>
            <CardTitle className="text-2xl text-gray-900 mb-2">{candidate.name}</CardTitle>
            <p className="text-gray-600 text-lg">{candidate.role}</p>
          </div>
          <Badge className={`${getStageColor(candidate.stage)} font-medium px-4 py-1 text-sm`}>
            {candidate.stage}
          </Badge>
          
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-center">
              <span className="mr-2">📋</span>
              Activity Timeline
            </h3>
            <div className="space-y-3 text-left">
              {candidate.activities.map((activity, index) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                      index === candidate.activities.length - 1 ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 text-sm">
                      {activity.from && (
                        <Badge variant="outline" className="text-xs">
                          {activity.from}
                        </Badge>
                      )}
                      <span className="text-gray-400">→</span>
                      <Badge className={`text-xs ${getStageColor(activity.to)}`}>
                        {activity.to}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
