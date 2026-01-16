import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCandidateStage } from '@/app/lib/api/candidates';
import { Candidate, Stage } from '@/app/lib/types';


export function useUpdateCandidateStage() {
  const queryClient = useQueryClient();

  return useMutation({
      onMutate: async ({ id, stage }) => {  //runs before the api call
          // Cancel any refetches
          await queryClient.cancelQueries({ queryKey: ['candidates'] });
        
          // Get the current cache
          const previousData =
            queryClient.getQueryData<{ candidates: Candidate[] }>([
              'candidates',
            ]);
        
          // Optimistically update the cache
          queryClient.setQueryData<{ candidates: Candidate[] }>(
            ['candidates'],
            previousCache => {
              if (!previousCache) return previousCache;
        
              return {
                candidates: previousCache.candidates.map(candidate =>
                  candidate.id === id
                    ? {
                        ...candidate,
                        stage,
                        activities: [
                          ...candidate.activities,
                          {
                            id: crypto.randomUUID(),
                            from: candidate.stage,
                            to: stage,
                            timestamp: Date.now(),
                          },
                        ],
                      }
                    : candidate
                ),
              };
            }
          );
          // return the previous data for rollback
          return { previousData };
      }, 
      mutationFn: async ({
          id,
          stage,
      }: {
          id: string;
          stage: Stage;
      }) => {
          return updateCandidateStage(id, stage);
      },
      onError: (_error, _variables, context) => { //rollback
          if (context?.previousData) {
          queryClient.setQueryData(
              ['candidates'],
              context.previousData
          );
          }
      }, 
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['candidates'] });
      },    
  });
}
  


