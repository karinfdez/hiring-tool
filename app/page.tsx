'use client'
import { useState, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {useCandidates} from "@/app/hooks/useCandidates";
import {CandidateRow} from '@/components/candidates/CandidateRow';
import { Spinner } from '@/components/ui/spinner';
import { CandidateDetail } from '@/components/candidates/CandidateDetail';

export default function CandidatesPage() {

  const {data, isLoading, error} = useCandidates()
  const [ candidateId, setSelectedCandidateId] = useState<string | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: data?.candidates.length || 0,  //how many ites exist
    getScrollElement: () => parentRef.current, //Which DOM element is scrolling
    estimateSize: () => 72,  // estimated height of one row (px)
    overscan: 10,  // How many extra rows to render above and below the viewport
  });


  if(isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner className="h-12 w-12 text-muted-foreground" />
      </div>
    )
  }

  if(error) {
    return <div className="p-4 text-red-600">Failed to load candidates</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex gap-4">
      {/* Candidate virtualized list */}
      <div className="w-1/2">
        <div
        ref={parentRef}
        className="h-[400px] overflow-auto border rounded"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const candidate = data?.candidates[virtualRow.index];

            return (
              <CandidateRow
                key={candidate?.id}
                candidate={candidate}
                isSelected={candidateId === candidate?.id}
                onSelect={setSelectedCandidateId}
              />
            );
          })}
        </div>
      </div>
      </div>
      
      {/* Candidate detail */}
      <div className="w-1/2">
        <CandidateDetail candidate={candidateId ? data.candidates.find(c => c.id === candidateId) : null} />
      </div>
    </div>
  );
}
