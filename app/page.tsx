'use client'
import { useState, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {useCandidates} from "@/app/hooks/useCandidates";
import {CandidateRow} from '@/components/candidates/CandidateRow';
import { Spinner } from '@/components/ui/spinner';
import { CandidateDetail } from '@/components/candidates/CandidateDetail';
import { Candidate } from '@/app/lib/types';

export default function CandidatesPage() {

  const {data, isLoading, error} = useCandidates()
  const [ candidateId, setSelectedCandidateId] = useState<string | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: data?.candidates.length || 0,  //how many ites exist
    getScrollElement: () => parentRef.current, //Which DOM element is scrolling
    estimateSize: () => 100,  // estimated height of one row (px)
    overscan: 5, 
    scrollPaddingStart: 0,
    scrollPaddingEnd: 0,
  });


  if(isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-600 mt-2">Manage and review candidate applications</p>
        </div>
        <div className="flex flex-col items-center justify-center h-[700px] space-y-4">
          <Spinner className="h-12 w-12 text-muted-foreground" />
          <p className="text-gray-600 text-lg">Fetching candidates...</p>
        </div>
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
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Candidates</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage and review candidate applications</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Candidate virtualized list */}
        <div className="w-full lg:w-1/2">
          <div
            ref={parentRef}
            className="h-80 lg:h-[600px] overflow-auto bg-white border border-gray-200 rounded-lg shadow-sm"
            style={{ scrollBehavior: 'smooth' }}
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
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <CandidateRow
                  candidate={candidate}
                  isSelected={candidateId === candidate?.id}
                  onSelect={setSelectedCandidateId}
                />
              </div>
            );
          })}
          </div>
          </div>
        </div>
        
        {/* Candidate detail */}
        <div className="w-full lg:w-1/2">
          <CandidateDetail 
            key={candidateId} 
            candidate={candidateId ? data.candidates.find((c: Candidate) => c.id === candidateId) : null} 
          />
        </div>
      </div>
    </div>
  );
}
