
export type Stage =
  | 'Applied'
  | 'Screening'
  | 'Interview'
  | 'Offer'
  | 'Hired'
  | 'Rejected';



// A record of an stage change
export interface Activity {
    id: string,
    from?: Stage,
    to: Stage,
    timestamp: Date,
}

export interface Candidate {
    id: string,
    name: string,
    role: string,
    stage: Stage,  //current state
    activities: Activity[]; // A timeline of stage changes
}

