import { Stage } from '@/app/lib/types';

export async function updateCandidateStage(
  id: string,
  stage: Stage
) {
  const res = await fetch('/api/candidates', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, stage }),
  });

  if (!res.ok) {
    throw new Error('Failed to update candidate stage');
  }

  return res.json();
}
