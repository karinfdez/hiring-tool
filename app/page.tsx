'use client'
import { useState, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {useCandidates} from "@/app/hooks/useCandidates";
import { Candidate } from "@/app/lib/types";

export default function CandidatesPage() {

  const {data, isLoading, error} = useCandidates()
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: data?.candidates.length || 0,  //how many ites exist
    getScrollElement: () => parentRef.current, //Which DOM element is scrolling
    estimateSize: () => 72,  // estimated height of one row (px)
    overscan: 10,  // How many extra rows to render above and below the viewport
  });


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
      
      <div
        ref={parentRef}
        className="h-[600px] overflow-auto border rounded"
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
              <div
                key={candidate?.id}
                className="absolute left-0 right-0 border-b p-3"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="font-medium">{candidate?.name}</div>
                <div className="text-sm text-gray-600">
                  {candidate?.role} · {candidate?.stage}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
