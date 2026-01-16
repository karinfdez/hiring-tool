import { NextResponse } from "next/server";
import candidates from "@/app/mock_data/candidates.json";
import { delay, mayFail } from "@/app/lib/mockApi";
import { Candidate } from "@/app/lib/types";

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
        const { candidate, newStage } = body;

        if (!candidate) {
            return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
        }

        candidate.stage = newStage;


        return NextResponse.json({
            candidate
        })
    }catch(error){
        console.error('Error updating candidate stage:', error);
        return NextResponse.json({ error: 'Failed to update candidate stage' }, { status: 500 });
    }
}
    
