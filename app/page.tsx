'use client'
import {useCandidates} from "@/app/hooks/useCandidates";
import { Candidate } from "@/app/lib/types";

export default function CandidatesPage() {

  const {data, isLoading, error} = useCandidates()

  if(isLoading) {
    return <div className="p-4">Loading candidates…</div>;
  }

  if(error) {
    return <div className="p-4 text-red-600">Failed to load candidates</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Candidates</h1>

      <ul className="space-y-2">
        {data?.candidates.map((candidate: Candidate) => (
          <li
            key={candidate.id}
            className="border rounded p-3"
          >
            <div className="font-medium">{candidate.name}</div>
            <div className="text-sm text-gray-600">
              {candidate.role} · {candidate.stage}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
