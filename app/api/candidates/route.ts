import { NextResponse } from "next/server";
import candidatesData from "@/app/mock_data/candidates.json";
import { delay, mayFail } from "@/app/lib/mockApi";
import { Candidate } from "@/app/lib/types";

const candidates = candidatesData as Candidate[];

export async function GET() {
    await delay();
    return NextResponse.json({
        candidates
    })
}

export async function PATCH(request: Request) {
    try {   
        await delay();
        mayFail();

        const body = await request.json();
        const { id, stage } = body;

        const candidate = candidates.find((c) => c.id === id);

        if (!candidate) {
            return NextResponse.json(
              { error: 'Candidate not found' },
              { status: 404 }
            );
          }
      
        const newActivity = {
            id: crypto.randomUUID(),
            from: candidate.stage,
            to: stage,
            timestamp: Date.now(),
        };
        
        candidate.stage = stage;
        candidate.activities.push(newActivity);
      
        return NextResponse.json(candidate);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update candidate stage' }, { status: 500 });
    }
}
    
