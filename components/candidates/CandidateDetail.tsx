import { Candidate, Stage } from '@/app/lib/types';
import { Badge } from '@/components/ui/badge';
import { useUpdateCandidateStage } from '@/app/hooks/useUpdateCandidateStage';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

type CandidateDetailProps = {
  candidate: Candidate | null;
};

const STAGES: Stage[] = [
  'Applied',
  'Screening',
  'Interview',
  'Offer',
  'Hired',
  'Rejected',
];

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
  const [selectedStage, setSelectedStage] = useState<Stage | ''>('');
  const [error, setError] = useState<string | null>(null);
  const updateStage = useUpdateCandidateStage();  

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

  const handleStageChange = (newStage: Stage) => {
    setError(null); // Clear any previous errors
    updateStage.mutate({
      id: candidate.id,
      stage: newStage,
    }, {
      onError: (error) => {
        setError(error instanceof Error ? error.message : 'Failed to update candidate stage');
        // Reset the select back to empty on error
        setSelectedStage('');
      },
      onSuccess: () => {
        // Reset the select after successful update
        setSelectedStage('');
      }
    });
  };

  return (
    <Card className="h-100 lg:h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center space-y-4 max-w-md mx-auto">
          <div>
            <CardTitle className="text-xl sm:text-2xl text-gray-900 mb-2">{candidate.name}</CardTitle>
            <p className="text-gray-600 text-base sm:text-lg">{candidate.role}</p>
          </div>
          <Badge className={`${getStageColor(candidate.stage)} font-medium px-3 sm:px-4 py-1 text-xs sm:text-sm`}>
            {candidate.stage}
          </Badge>
          
          <div className="mt-4 sm:mt-6">
            <label htmlFor="stage-select" className="block text-sm font-medium text-gray-700 mb-2">
              Change Stage
            </label>
            <select
              id="stage-select"
              value={selectedStage}
              onChange={(e) => {
                const newStage = e.target.value as Stage;
                setSelectedStage(newStage);
                handleStageChange(newStage);
              }}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select new stage...</option>
              {STAGES.filter(stage => stage !== candidate.stage).map(stage => (
                <option key={stage} value={stage} disabled={stage === candidate.stage}>
                  {stage}
                </option>
              ))}
            </select>
            {error && (
              <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
                {error}
              </div>
            )}
          </div>
          
          <div className="mt-6 sm:mt-8">
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center justify-center text-sm sm:text-base">
              <span className="mr-2">📋</span>
              Activity Timeline
            </h3>
            <div className="space-y-2 sm:space-y-3 text-left">
              {candidate.activities.map((activity, index) => (
                <div key={activity.id} className="flex items-start space-x-2 sm:space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                      index === candidate.activities.length - 1 ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-xs sm:text-sm">
                      <div className="flex items-center space-x-2 mb-1 sm:mb-0">
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
